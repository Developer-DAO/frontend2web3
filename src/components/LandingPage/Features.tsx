import React from 'react';
import { Sales, Secure, Support, Trusted } from '../icons';
import styles from './features.module.css';
const Features = () => {
  return (
    <div className={styles.features}>
      <div className={styles.features__header}>
        <div className={styles.features__header_title}>
          Learn With Video, Text, or both! Many lessons will be available in
          various mediums
        </div>
        <div className={styles.features__header_subtitle}>
          What skills do you need to dive into Web3 as frontend developer? Get
          started on your journey now by connecting your wallet!
        </div>
      </div>

      <div className={styles.features__lists}>
        <div className={styles.why}>
          <div className={styles.bgshadow}></div>
          <div className={styles.why_icon}>
            <div className={styles.shadow}></div>
            <Sales />
          </div>
          <div className={styles.why_text}>
            <h3>Simple and Explanatory</h3>
            <p>We deliver your top-up within minutes.</p>
          </div>
        </div>

        <div className={styles.why}>
          <div className={styles.bgshadow}></div>
          <div className={styles.why_icon}>
            <div className={styles.shadow}></div>
            <Secure />
          </div>
          <div className={styles.why_text}>
            <h3>Secure payments</h3>
            <p>Your transactions are always encrypted and secure.</p>
          </div>
        </div>

        <div className={styles.why}>
          <div className={styles.bgshadow}></div>
          <div className={styles.why_icon}>
            <div className={styles.shadow}></div>
            <Trusted />
          </div>
          <div className={styles.why_text}>
            <h3>Trusted by the world</h3>
            <p>Available discounts on bulk Airtime/Data purchase.</p>
          </div>
        </div>

        <div className={styles.why}>
          <div className={styles.bgshadow}></div>
          <div className={styles.why_icon}>
            <div className={styles.shadow}></div>
            <Support />
          </div>
          <div className={styles.why_text}>
            <h3>We are here to help </h3>
            <p>Real people to assist you with 24hr support.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
