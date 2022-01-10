// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { users } from '../../../utils/users';
import * as crypto from 'crypto';

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;
  let user = users[address];
  if (!user) {
    user = {
      address,
      nonce: `FrontendToWeb3 is requesting a signature to verify authentication. nonce: ${crypto.randomUUID()}`,
    };
    users[address] = user;
  } else {
    const nonce = `FrontendToWeb3 is requesting a signature to verify authentication. nonce: ${crypto.randomUUID()}`;
    user.nonce = nonce;
    users[address] = user;
  }
  res.status(200).json(user);
}
