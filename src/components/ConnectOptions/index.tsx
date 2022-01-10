import * as React from 'react';
import { useConnect, useAccount, useSignMessage } from 'wagmi';
import styles from './index.module.css';

const ConnectOptions = ({ setIsOpen, refetch }: any) => {
  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount();
  const [{ data: signData }, signMessage] = useSignMessage();
  const signIn = async () => {
    const authData = await fetch(
      `/api/auth/authenticate?address=${accountData?.address}`,
    );
    const user = await authData.json();
    console.log({ user });
    signMessage({ message: user.nonce });
  };

  React.useEffect(() => {
    const verifySignature = async () => {
      const response = await fetch(`/api/auth/verify`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
        },
        body: JSON.stringify({
          address: accountData?.address,
          signature: signData,
        }),
      });
      const verificationData = await response.json();
      if (verificationData.authenticated) {
        refetch();
        setIsOpen(false);
      }
    };
    if (signData) {
      verifySignature();
    }
  }, [signData, accountData?.address, refetch]);

  if (accountData) {
    return (
      <>
        <h1 className={styles.header}>
          We have connected to your wallet, please sign in or disconnect
        </h1>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonBackground}></div>
          <button onClick={() => signIn()} className={styles.button}>
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
