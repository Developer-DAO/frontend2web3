import jwt from 'jsonwebtoken';

export default function auth(req, res) {
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
