const SEO = {
  title: `Frontend to Web3`,
  description: `A guide to learning the needed skills to transition into Web3 as a frontend developer.`,
  canonical: `https://www.canonical.ie/`,
  openGraph: {
    type: `website`,
    locale: `en_IE`,
    url: `https://frontend2web3.vercel.app`,
    title: `Frontend to web3`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/og/defaultOg.png`,
      },
    ],
    site_name: `frontend2web3.vercel.app`,
  },
  twitter: {
    handle: `@frontend2web3`,
    cardType: `summary_large_image`,
  },
};

export default SEO;
