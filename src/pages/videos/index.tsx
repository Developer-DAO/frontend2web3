import fs from 'fs';
import path from 'path';
import { videoFilePaths, VIDEOS_PATH } from '@/utils/mdxUtils';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';

import styles from './index.module.css';

const Videos = ({ videos }: any) => {
  return (
    <main className={styles.pageContainer}>
      <h1 className={styles.pageHeader}>Video tutorials</h1>
      <div className={styles.postCard}>
        {videos.map((video: any) => {
          const { description, image, slug, title } = video.data;
          return (
            <div className={styles.cardContainer} key={slug}>
              <div className={styles.cardBackground}></div>
              <Link passHref href={`videos/${slug}`}>
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
  );
};

export default Videos;

export function getStaticProps() {
  const videos = videoFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(VIDEOS_PATH, filePath));
    const { data } = matter(source);

    return {
      data,
    };
  });

  return { props: { videos } };
}
