import { AppProps } from 'next/app';
import { Layout } from '@/components';
import '@/globalStyles/global.css';

import { Provider, chain, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';

import UserProvider from '@/contexts/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DefaultSeo, NextSeo } from 'next-seo';
import SEO from '../config/next-seo.config';
// import your default seo configuration
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

const queryClient = new QueryClient();

// Chains for connectors to support
const chains = defaultChains;

// Set up connectors
const connectors = ({ chainId }: any) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: `My wagmi app`,
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Provider autoConnect connectors={connectors}>
          <Layout>
            <DefaultSeo {...SEO} />

            <Component {...pageProps} />
          </Layout>
        </Provider>
      </UserProvider>
    </QueryClientProvider>
  );
}
