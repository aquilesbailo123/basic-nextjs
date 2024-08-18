import { query } from '../../../lib/db';
import { getToken } from 'next-auth/jwt';
import { deleteFileFromGCS } from '../../../lib/gcs';

/**
 * Handler function delete a record in the database.
 *
 * @param {object} req - The request object containing formData.
 * @param {object} res - The response object used to send responses back to the client.
 */
export default async function handler(req, res) {
      const { name } = req.query;

      if (req.method !== 'DELETE') {
            res.setHeader('Allow', ['DELETE']);
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
            const result = await query('SELECT u.* FROM "Table" WHERE name = $1', [name]);
            if (!Array.isArray(result?.rows)) {
                  return res.status(404).json({ error: 'Not found' });
            }
            
            // Delete event
            await query('DELETE FROM "Event" WHERE id = $1', [eventId]);

            // Delete the old image
            let oldEventImage = result.rows[0].image
            let oldImageFileName = oldEventImage.split('/').slice(4).join('/')
            await deleteFileFromGCS(oldImageFileName);

            res.status(200).json({ success: 'Deleted record' });
      } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
      }
}
