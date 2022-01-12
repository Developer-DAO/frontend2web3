import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { createClient } from '@supabase/supabase-js';

const KEY = process.env.SECRET_KEY as string;

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string,
);

const fetchUser = async (address: string) => {
  const { data, error } = await supabase
    .from(`builders`)
    .select(`*`)
    .eq(`address`, address);
  if (error) {
    return;
  }
  return data;
};

export default async function verify(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!req.body) {
    res.statusCode = 500;
    res.end(`No body detected`);
    return;
  }
  const { address, signature } = req.body;
  const user = await fetchUser(address);
  const singleUser = user && user[0];
  const nonce = singleUser.nonce;
  const decodedAddress = ethers.utils.verifyMessage(nonce, signature);
  if (address.toLowerCase() !== decodedAddress.toLowerCase()) {
    return;
  }
  res.setHeader(
    `Set-Cookie`,
    cookie.serialize(
      `frontendweb3token`,
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
