import * as React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import getOgImage from '@/lib/ getOgImage';
import Head from '@/components/Head';
interface IOgimageProps {
  ogImage: any;
  baseUrl: string;
  slug: string;
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as any;
  const ogImage = await getOgImage(
    `/phiilu.com/post?title=${`Connect ethers`}&url=https://og-image.phiilu.com/${slug}&date=${false}&readTime=${2}`,
  );
  const baseUrl = process.env.BASE_URL;

  return {
    props: { ogImage, baseUrl, slug },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const arr: string[] = [`slug1`, `slug2`];
  const paths = arr.map((slug) => {
    return {
      params: { slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
const OgImage: React.FunctionComponent<IOgimageProps> = ({ ogImage, slug }) => {
  return (
    <div>
      <Head
        title="slug page"
        description="https://frontend2web3.vercel.app/"
        url="https://frontend2web3.vercel.app/"
        image={ogImage}
        date="2022-02-10T07:05:16.923Z"
        keywords="keywordds"
      />

      <h1>{slug}</h1>
    </div>
  );
};

export default OgImage;
