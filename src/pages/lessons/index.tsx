import fs from 'fs';
import path from 'path';
import { LESSONS_PATH, lessonFilePaths } from '@/utils/mdxUtils';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import styles from './index.module.css';
import getOgImage from '@/lib/ getOgImage';
import { GetStaticProps } from 'next';

const Lessons = ({ lessons, ogImage }: any) => {
  return (
    <>
      <NextSeo
        openGraph={{
          url: `https://frontend2web3.vercel.app`,
          title: `Frontend to Web3  | Lessons`,
          description: `A guide to learning the needed skills to transition into Web3 as a frontend developer.`,
          images: [{ url: `${ogImage}` }],
          site_name: `SiteName`,
        }}
      />

      <main className={styles.pageContainer}>
        <h1 className={styles.pageHeader}>Text based tutorials</h1>
        <div className={styles.postCard}>
          {lessons.map((lesson: any) => {
            const { description, image, slug, title } = lesson.data;
            return (
              <div className={styles.cardContainer} key={slug}>
                <div className={styles.cardBackground}></div>
                <Link passHref href={`lessons/${slug}`}>
                  <div className={styles.card}>
                    <Image
                      className={styles.image}
                      src={image}
                      alt=""
                      width="350%"
                      height="200%"
                    />
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Lessons;

export const getStaticProps: GetStaticProps = async () => {
  const ogImage = await getOgImage(`/rainbow`);

  const lessons = lessonFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(LESSONS_PATH, filePath));
    const { content, data } = matter(source);

    //get OG Image

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { lessons, ogImage } };
};
