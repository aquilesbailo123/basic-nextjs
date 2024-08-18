import { query } from '../../../lib/db';
import { getToken } from 'next-auth/jwt';

/**
 * Handler function to add a new record to the database.
 *
 * @param {object} req - The request object containing formData.
 * @param {object} res - The response object used to send responses back to the client.
 */
export default async function handler(req, res) {
      const { name } = req.query;
      const { description } = req.query;

      if (req.method !== 'POST') {
            res.setHeader('Allow', ['POST']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
      }

      // Verifies token exists
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
            return res.status(401).json({ error: 'No token provided' });
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
            // Insert the new record into the database
            const result = await query(
                  `INSERT INTO "Table" ("name", "description") 
                  VALUES ($1, $2)`,
                  [name, description]
            );

            res.status(200).json({ success: 'Added record' });
      } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
      }
}
