import Head from 'next/head';
import { ConnectWallet } from '@/components';
import styles from './pageStyles/index.module.css';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Frontend for Web3</title>
        <meta
          name="description"
          content="A guide to learning the needed skills to transition into Web3 as a frontend developer."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.header}>
            <span className={styles.slash}>
              <Image
                src="/images/icon.png"
                alt=""
                width={`100%`}
                height={`100%`}
                className={styles.logo}
              />
            </span>
            <div className={styles.headerText}>Frontend to Web3</div>
          </h1>
          <p className={styles.copy}>
            The platform for Frontend developers looking to learn about Dapps,
            Dapp developers looking to learn about frontends, Javascript coders
            excited about decentralization or a mix of all of these!
          </p>
          <p className={styles.copy}>
            {` `}
            Learn With Video, Text, or both! This Course will be made available
            in various mediums{` `}
          </p>
          <p className={styles.copy}>
            Get Started on your journey now by connecting your wallet!
          </p>
          <ConnectWallet />
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/buildingBlocks.svg"
            alt=""
            width={500}
            height={650}
          />
        </div>
      </main>
    </div>
  );
}
