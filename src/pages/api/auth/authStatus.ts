import { NextApiRequest, NextApiResponse } from 'next';

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  let authenticated = false;
  const { frontendweb3token } = req.cookies;
  if (frontendweb3token) authenticated = true;
  res.status(200).json({ authenticated });
}
