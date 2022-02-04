import React from 'react';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import { RocketCode, Sales, Secure, Support, Trusted } from '../icons';
import RainbowButton from './Buttons';
import styles from './landingPageStyles/features.module.css';
const Features = () => {
  return (
    <div className={styles.features}>
      <div className={styles.features__header}>
        <div className={styles.features__header_title}>
          Frontend to Web3 <RocketCode />
        </div>
        <div className={styles.features__header_subtitle}>
          What skills do you need to dive into Web3 as frontend developer? Get
          started on your journey now! Connect your wallet to track your
          progress!
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
            <h3>Video lessons</h3>
            <p>Follow along with guided video tutorials.</p>
            <div className={styles.rainbowBtn__container}>
              <RainbowButton url="/videos" btnText="Explore" />
            </div>
          </div>
        </div>

        <div className={styles.why}>
          <div className={styles.bgshadow}></div>
          <div className={styles.why_icon}>
            <div className={styles.shadow}></div>
            <Secure />
          </div>
          <div className={styles.why_text}>
            <h3>Text based Lessons</h3>
            <p>Read through instructions and code snippets.</p>
            <div className={styles.rainbowBtn__container}>
              <RainbowButton url="/lessons" btnText="Explore" />
            </div>
          </div>
        </div>

        <div className={styles.why}>
          <div className={styles.bgshadow}></div>
          <div className={styles.why_icon}>
            <div className={styles.shadow}></div>
            <Trusted />
          </div>
          <div className={styles.why_text}>
            {/* Wrapper to properly position tracking component */}
            <div className={styles.tracking_wrapper}>
              <h3>Track your progress</h3>
              <p>
                Connect your wallet to create an account and track your
                progress.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.why}>
          <div className={styles.bgshadow}></div>
          <div className={styles.why_icon}>
            <div className={styles.shadow}></div>
            <Support />
          </div>
          <div className={styles.why_text}>
            <h3>Earn Credentials </h3>
            <p>
              As you track your progress earn on chain credentials to showcase
              your skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
