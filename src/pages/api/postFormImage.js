import { query } from '../../lib/db';
import { upload, uploadToGCS } from '../../lib/multer';
import { getToken } from 'next-auth/jwt';

/**
 * Handler function to add a new record to the database.
 * Expects a form that includes an image.
 *
 * @param {object} req - The request object containing formData and file upload.
 * @param {object} res - The response object used to send responses back to the client.
 */
const handler = (req, res) => {

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
      upload.single('image')(req, res, async (err) => {
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

            try {
                  // Use the custom uploadToGCS function to upload the file to Google Cloud Storage
                  await new Promise((resolve, reject) => {
                        uploadToGCS(req, res, (err) => {
                              if (err) {
                                    reject(err);
                              } else {
                                    resolve();
                              }
                        });
                  });

                  // Extract formData values from the request body
                  const { name, description } = req.body;
                  const image = req.file ? req.file.gcsUrl : null;

                  // Insert the new record into the database
                  const result = await query(
                        `INSERT INTO "Table" ("name", "description", "image") 
                        VALUES ($1, $2, $3)`,
                        [name, description, image]
                  );

                  res.status(200).json({ success: 'Added record' });
            } catch (error) {
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