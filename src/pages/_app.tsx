import { AppProps } from 'next/app';
import { Layout } from '@/components';
import '@/globalStyles/global.css';

import { Provider, chain, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';

import UserProvider from '@/contexts/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import NextNProgress from 'nextjs-progressbar';
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

const queryClient = new QueryClient();

//Progress bar configuration
const config = {
  color: `
  linear-gradient(
    90deg,
    #44ff9a -0.55%,
    #44b0ff 22.86%,
    #8b44ff 48.36%,
    #ff6644 73.33%,
    #ebff70 99.34%
  )
`,
  showOnShallow: true,
  height: 2.2,
};
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
          <NextNProgress {...config} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </UserProvider>
    </QueryClientProvider>
  );
}
