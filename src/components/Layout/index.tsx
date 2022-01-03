import * as React from 'react';
import Link from 'next/link';
import ConnectWallet from '../ConnectWallet';
import Image from 'next/image';
import styles from './index.module.css';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" passHref>
            <div className={styles.linkContainer}>
              <Image
                src="/images/icon.png"
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
        <ConnectWallet />
      </nav>
      {children}
    </>
  );
};

export default Layout;
