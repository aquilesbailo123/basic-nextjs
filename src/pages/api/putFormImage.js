import { query } from '../../../lib/db';
import { upload, uploadToGCS } from '../../../lib/multer';
import { deleteFileFromGCS } from '../../../lib/gcs';
import { getToken } from 'next-auth/jwt';

/**
 * Handler function to edit a record in the database.
 * Expects a form that includes an image or doesnt.
 *
 * @param {object} req - The request object containing formData and file upload.
 * @param {object} res - The response object used to send responses back to the client.
 */
const handler = (req, res) => {
      const { id } = req.query;

      if (req.method !== 'POST') {
            res.setHeader('Allow', ['POST']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
      }

      // Verifies token exists
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
            return res.status(401).json({ error: 'No token provided' });
      }

      // Use the multer middleware to handle the file upload
      upload.single('logo')(req, res, async (err) => {
            if (err) {
                  return res.status(500).json({ error: err.message });
            }

            try {
                  // Get token extracts a encoded accessToken in the req, either from a cookie or from authorization.headers
                  const decoded = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
                  if (!decoded) {
                        return res.status(401).json({ error: 'Invalid token' });
                  }
                  // const userEmail = decoded.email;

                  // Add more validation logic

            } catch (error) {
                  return res.status(500).json({ error: 'Error validating token', details: error.message });
            }

            // Use the custom uploadToGCS function to upload the file to Google Cloud Storage
            let logo = null;
            try {
                  await new Promise((resolve, reject) => {
                        uploadToGCS(req, res, (err) => {
                              if (err) {
                                    reject(err);
                              } else {
                                    resolve();
                              }
                        });
                  });
                  logo = req.file ? req.file.gcsUrl : null;

            } catch (error) {
                  logo = null;
            }
            
            try {
                  // Extract formData values from the request body
                  const { name, description } = req.body;

                  // Initialize the base query and an array for the values
                  let baseQuery = 'UPDATE "Table" SET';
                  const queryValues = [];
                  let index = 1;

                  // Helper function to add values to the query
                  const addQueryValue = (field, value) => {
                              if (value !== undefined && value !== null) {
                              if (queryValues.length > 0) baseQuery += ',';
                              baseQuery += ` ${field} = $${index}`;
                              queryValues.push(value);
                              index++;
                        }
                  };

                  // Check and add values to the query
                  addQueryValue('name', name);
                  addQueryValue('description', description);

                  baseQuery += ' WHERE id = $' + index;
                  queryValues.push(id); // Assuming you have an id in the request body to identify the record

                  // Save the old utl of the logo if needed
                  let oldLogoUrl = null
                  if (logo != null) {
                        const organization = await query('SELECT * FROM "Table" WHERE id = $1', [id]);
                        oldLogoUrl = organization?.rows[0]?.logo || null;
                  }

                  // Insert the new record record into the database
                  if (queryValues.length > 1) {
                        const result = await query(baseQuery, queryValues);
                  }

                  // Delete the old logo
                  if (oldLogoUrl != null) {
                        let oldLogoFileName = oldLogoUrl.split('/').slice(4).join('/')
                        await deleteFileFromGCS(oldLogoFileName);
                  }

                  res.status(200).json({ success: 'Edited record.' });
            } catch (error) {
                  // Return an error response if something goes wrong
                  res.status(500).json({ error: 'Internal server error' });
            }
      });
};

// Disable body parsing by Next.js as multer handles it, this prevents formData being parsed by Next.js
export const config = {
      api: {
            bodyParser: false, 
      },
};

export default handler;
