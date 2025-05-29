import { encrypt } from '../lib/crypt.js';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { data } = req.body;
  if (!data) return res.status(400).json({ error: 'No data provided' });

  const result = encrypt(data);
  return res.status(200).json(result);
}
