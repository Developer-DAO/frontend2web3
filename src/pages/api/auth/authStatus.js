import jwt from 'jsonwebtoken';

export default function auth(req, res) {
  let authenticated = false;
  const { frontendweb3token } = req.cookies;
  const data = jwt.decode(frontendweb3token);
  const expiration = new Date(data?.exp);
  const now = new Date();
  if (expiration.setHours(0, 0, 0, 0) <= now.setHours(0, 0, 0, 0))
    authenticated = true;
  res.status(200).json({ authenticated });
}
