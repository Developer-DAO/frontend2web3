import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import path from 'path';
import { videoFilePaths, VIDEOS_PATH } from '../../utils/mdxUtils';
import Code from '@/components/MDXComponents/Code';
import ReactPlayer from 'react-player';
import styles from './index.module.css';

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  ConnectWallet: dynamic(() => import(`@/components/ConnectOptions`)),
  Head,
  code: Code,
  ReactPlayer,
};

export default function VideoPage({ source, frontMatter }: any) {
  return (
    <main className={styles.container}>
      <div className={styles.postHeader}>
        <h1>{frontMatter.title}</h1>
        {frontMatter.description && (
          <p className={styles.description}>{frontMatter.description}</p>
        )}
      </div>
      <main>
        <MDXRemote {...source} components={components} />
      </main>
    </main>
  );
}

interface Params {
  slug: string;
}

interface Props {
  params: Params;
}

export const getStaticProps = async ({ params }: Props) => {
  const postFilePath = path.join(VIDEOS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = videoFilePaths
    // Remove file extensions for page paths
    .map((path: string) => path.replace(/\.mdx?$/, ``))
    // Map the path into the static paths object required by Next.js
    .map((slug: string) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};
