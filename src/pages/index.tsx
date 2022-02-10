import Head from 'next/head';
import styles from './pageStyles/index.module.css';
import Image from 'next/image';
import Features from '@/components/LandingPage/Features';
import { GetStaticProps, GetStaticPaths } from 'next';
import getOgImage from '@/lib/ getOgImage';

export const getStaticProps: GetStaticProps = async (context) => {
  const ogImage = await getOgImage(
    `/phiilu.com/post?title=${`Connect ethers`}&url=https://og-image.phiilu.com/index&date=${false}&readTime=${2}`,
  );
  const baseUrl = process.env.BASE_URL;

  return {
    props: { ogImage, baseUrl },
  };
};

interface ind {
  ogImage: any;
  baseUrl: string;
  slug: string;
}

export default function Home({ ogImage, baseUrl, slug }: ind) {
  console.log(`ogImage`, ogImage);

  return (
    <div>
      <Head>
        <title>Frontend to Web32</title>
        <meta
          name="description"
          content="A guide to learning the needed skills to transition into Web3 as a frontend developer."
        />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://phiilu.com/" />
        <meta property="og:image" content={ogImage} />

        <meta property="og:title" content="Frontend to web3" />
        <meta
          property="og:description"
          content="A guide to learning the needed skills to transition into Web3 as a frontend developer"
        />
      </Head>

      <main className={styles.main}>
        <section>
          <Features />
        </section>
        <section className={styles.moreInfo}>
          <div className={styles.moreInfo__left}>
            <div className={styles.moreInfo__left_heading}>
              Learn Web3 with Video
            </div>
            <div className={styles.moreInfo__left_subheading}>
              Follow guided video tutorials that help build the skills you need
              to develop the frontend for your dApps. Watch the videos and then
              try it on your own!
            </div>
          </div>

          <div className={styles.moreInfo__rightImg}>
            <div className={styles.moreInfo__right_imageWrapperBg}></div>
          </div>
        </section>

        <section className={styles.textInfo}>
          <div className={styles.textInfo__left}>
            <div className={styles.textInfo__left_imageWrapper}>
              <Image
                src="/images/lesson1.png"
                alt=""
                width={750}
                height={650}
                className={styles.codeImg}
              />
            </div>
          </div>

          <div className={styles.textInfo__right}>
            <div className={styles.textInfo__right_heading}>
              Learn web3 with text-based lessons
            </div>
            <div className={styles.textInfo__right_subheading}>
              Video not your thing? Follow a blog-style tutorial with code
              snippets aimed at helping you build the same skills available in
              all of our video tutorials.
            </div>
          </div>
        </section>

        <section className={styles.moreInfo}>
          <div className={styles.moreInfo__left}>
            <div className={styles.moreInfo__left_heading}>
              Just go in and build
            </div>
            <div className={styles.moreInfo__left_subheading}>
              Sometimes the best way to learn is just to try and build
              something. Skip the lessons and download the lesson and challenge
              code from our public github repo and start building on your own.
            </div>
          </div>

          <div className={styles.moreInfo__rightImg}>
            <div className={styles.moreInfo__right_imageWrapperBg}></div>
          </div>
        </section>
      </main>
    </div>
  );
}
