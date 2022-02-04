import * as React from 'react';
import Link from 'next/link';
import ReactModal from 'react-modal';
import ConnectWallet from '../ConnectWallet';
import Image from 'next/image';
import styles from './index.module.css';
import { ConnectOptions } from '..';
import { useAccount } from 'wagmi';

import { UserContext } from '@/contexts/UserContext';
import '@fontsource/plus-jakarta-sans';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { authenticated, refetch } = React.useContext(UserContext);
  const [{ data }] = useAccount({ fetchEns: true });
  const isAuthenticated = authenticated && data;
  const getDisplayName = () => {
    if (data?.ens?.name) {
      return data?.ens?.name;
    } else {
      const add = data?.address as string;
      const truncate = add.slice(add.length - 4);
      return `0x...${truncate}`;
    }
  };

  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel={`Select A Wallet Connect Option`}
        portalClassName={styles.modal}
        style={{
          content: {
            width: `65%`,
            height: `65%`,
            margin: `5% auto`,
            backgroundColor: `#343436`,
          },
        }}
      >
        <ConnectOptions setIsOpen={setIsOpen} refetch={refetch} />
      </ReactModal>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" passHref>
            <div className={styles.linkContainer}>
              <Image
                src="/images/icon.svg"
                alt=""
                width={`100%`}
                height={`100%`}
                className={styles.logo}
              />
            </div>
          </Link>
          <div className={styles.linkWrapper}>
            <Link href="/lessons">
              <a className={styles.links}>Lessons</a>
            </Link>
            <Link href="/videos">
              <a className={styles.links}>Videos</a>
            </Link>
            <Link href="/about">
              <a className={styles.links}>About</a>
            </Link>
          </div>
        </div>
        {isAuthenticated ? (
          <div className={styles.profileWrapper}>
            <p className={styles.displayname}>{getDisplayName()}</p>
          </div>
        ) : (
          <ConnectWallet setIsOpen={setIsOpen} />
        )}
      </nav>
      {children}
    </>
  );
};

export default Layout;
