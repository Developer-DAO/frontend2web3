// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  let authenticated = false;
  const { token } = req.cookies;
  const data = jwt.decode(token);
  console.log({ data });
  const expiration = new Date(data?.exp);
  const now = new Date();
  if (expiration.setHours(0, 0, 0, 0) <= now.setHours(0, 0, 0, 0))
    authenticated = true;
  console.log({ expiration });
  res.status(200).json({ authenticated });
}
