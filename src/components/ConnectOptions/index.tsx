import * as React from 'react';
import { useConnect, useAccount, useSignMessage, useNetwork } from 'wagmi';
import { SiweMessage } from 'siwe';
import styles from './index.module.css';

export type ConnectOptionsProps = {
  closeModal: () => void;
};

const ConnectOptions = ({ closeModal }: ConnectOptionsProps) => {
  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount();
  const [{}, signMessage] = useSignMessage();
  const [{ data: networkData }] = useNetwork();

  const handleSignIn = async () => {
    try {
      const address = accountData?.address;
      const chainId = networkData?.chain?.id;
      if (!address || !chainId) return;
      const nonceRes = await fetch(`/api/auth/nonce`);

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: `Sign in with Ethereum to the app.`,
        uri: window.location.origin,
        version: `1`,
        chainId,
        nonce: await nonceRes.text(),
      });
      const signRes = await signMessage({
        message: message.prepareMessage(),
      });
      if (signRes.error) throw signRes.error;

      // Verify signature
      const verifyRes = await fetch(`/api/auth/verify`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
        },
        body: JSON.stringify({ message, signature: signRes.data }),
      });
      if (!verifyRes.ok) throw new Error(`Error verifying message`);
      const authData = await fetch(
        `/api/auth/authenticate?address=${accountData?.address}`,
      );
      if (!authData.ok) throw new Error(`Error creating accoung`);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  if (accountData) {
    return (
      <>
        <h1 className={styles.header}>
          We have connected to your wallet, please sign in or disconnect
        </h1>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonBackground}></div>
          <button onClick={() => handleSignIn()} className={styles.button}>
            Sign In
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonBackground}></div>
          <button onClick={() => disconnect()} className={styles.button}>
            Disconnect
          </button>
        </div>
      </>
    );
  }

  return (
    <div>
      <h1 className={styles.header}>
        {` `}
        Sign in or create an account with the supported wallets below{` `}
      </h1>
      {data.connectors.map((connector) => (
        <div key={connector.id} className={styles.buttonContainer}>
          <div className={styles.buttonBackground}></div>
          <button
            className={styles.button}
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect(connector)}
          >
            {connector.name}
            {!connector.ready && ` (unsupported)`}
          </button>
        </div>
      ))}

      {error && (
        <div className={styles.error}>
          {error?.message ?? `Failed to connect`}
        </div>
      )}
    </div>
  );
};

export default ConnectOptions;
