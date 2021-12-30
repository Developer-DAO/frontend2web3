import * as React from 'react';
import Link from 'next/link';
import ConnectWallet from '../ConnectWallet';
import styles from './index.module.css';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/">
            <a className={styles.links}>
              <span className={styles.slash}>/</span>F-W3
            </a>
          </Link>
          <Link href="/course">
            <a className={styles.links}>Course</a>
          </Link>
          <Link href="/builders">
            <a className={styles.links}>Builders</a>
          </Link>
          <Link href="/about">
            <a className={styles.links}>About</a>
          </Link>
        </div>
        <ConnectWallet />
      </nav>
      {children}
    </>
  );
};

export default Layout;
