import { AppProps } from 'next/app';
import { Layout } from '@/components';
import '@/globalStyles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
