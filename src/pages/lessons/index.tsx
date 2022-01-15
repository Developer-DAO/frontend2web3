import fs from 'fs';
import path from 'path';
import { LESSONS_PATH, lessonFilePaths } from '@/utils/mdxUtils';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';

import styles from './index.module.css';

const Lessons = ({ lessons }: any) => {
  return (
    <>
      <h1 className={styles.pageHeader}>Text based tutorials</h1>
      <div className={styles.postCard}>
        {lessons.map((lesson: any) => {
          const { description, image, slug, title } = lesson.data;
          return (
            <div key={slug}>
              <Link passHref href={`lessons/${slug}`}>
                <Image
                  className={styles.image}
                  src={image}
                  alt=""
                  width="350%"
                  height="200%"
                />
              </Link>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Lessons;

export function getStaticProps() {
  const lessons = lessonFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(LESSONS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { lessons } };
}
