import * as crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

const fetchUser = async (address) => {
  const { data, error } = await supabase
    .from('builders')
    .select('*')
    .eq('address', address);
  if (error) {
    return;
  }
  return data;
};

const updateNonce = async (address) => {
  const { data, error } = await supabase
    .from('builders')
    .update({
      nonce: `FrontendToWeb3 is requesting a signature to verify authentication. nonce: ${crypto.randomUUID()}`,
    })
    .match({ address });
  if (error) {
    return;
  }
  if (data) return data;
};

const createUser = async (address) => {
  const { data, error } = await supabase.from('builders').insert({
    address,
    nonce: `FrontendToWeb3 is requesting a signature to verify authentication. nonce: ${crypto.randomUUID()}`,
  });
  if (error) {
    return;
  }
  if (data) return data;
};

export default async function auth(req, res) {
  const { address } = req.query;
  let user = await fetchUser(address);
  if (user.length === 0) {
    user = createUser(address);
  } else {
    user = await updateNonce(address);
  }
  res.status(200).json(user);
}
