import { query } from '../../lib/db';
import formidable from 'formidable';
import { getToken } from 'next-auth/jwt';

/**
 * Handler function to add a new record to the database.
 * Expects a form.
 *
 * @param {object} req - The request object containing formData.
 * @param {object} res - The response object used to send responses back to the client.
 */
const handler = async (req, res) => {
      
      if (req.method !== 'POST') {
            res.setHeader('Allow', ['POST']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
      }

      // Verifies token exists
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
            return res.status(401).json({ error: 'No token provided' });
      }
      
      const form = formidable();
      
      form.parse(req, async (err, fields, files) => {
            if (err) {
                  res.status(500).json({ error: 'Error parsing form data' });
                  return;
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
                  // Extract formData values from the form fields
                  const name = fields.name[0];
                  const description = fields.description[0];
                  
                  // Insert the new record to the database
                  const result = await query(
                        `INSERT INTO "Table" ("name", "description") 
                        VALUES ($1, $2)`,
                        [name, description]
                  );

                  res.status(200).json({ success: 'Added record' });
            } catch (error) {
                  res.status(500).json({ error: 'Internal server error' });
            }
      });
};

// Disable body parsing by Next.js as formidable handles it, this prevents formData being parsed by Next.js
export const config = {
      api: {
            bodyParser: false,
      },
};

export default handler;
