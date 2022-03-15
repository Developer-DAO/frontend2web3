import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

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

const createUser = async (address: string) => {
  const { data, error } = await supabase.from(`builders`).insert({
    address,
  });
  if (error) {
    return;
  }
  if (data) return data;
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;
  let user = await fetchUser(address as string);
  if (user?.length === 0) {
    user = await createUser(address as string);
  }
  res.status(200).json(user);
}
