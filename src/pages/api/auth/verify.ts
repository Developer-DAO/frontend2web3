import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { users } from '../../../utils/users';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const KEY = process.env.SECRET_KEY as string;

export default function verify(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) {
    res.statusCode = 500;
    res.end(`No body detected`);
    return;
  }
  const { address, signature } = req.body;
  const user = users[address];
  console.log(`hello`);
  console.log(user);
  const decodedAddress = ethers.utils.verifyMessage(
    user.nonce.toString(),
    signature,
  );
  if (address.toLowerCase() !== decodedAddress.toLowerCase()) {
    return;
  }
  res.setHeader(
    `Set-Cookie`,
    cookie.serialize(
      `token`,
      jwt.sign(
        {
          address,
        },
        KEY,
        {
          expiresIn: `7d`,
        },
      ),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV !== `development`,
        maxAge: 604800,
        sameSite: `strict`,
        path: `/`,
      },
    ),
  );
  res.status(200).json({
    authenticated: true,
  });
}
