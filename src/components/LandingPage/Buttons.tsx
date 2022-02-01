import Link from 'next/link';
import React from 'react';
import styles from './landingPageStyles/buttons.module.css';
type Props = {
  width?: string;
  height?: string;
  url: string;
  btnText: string;
};

export default function RainbowButton({ url, btnText }: Props) {
  return (
    <div>
      <Link href={url}>
        <a className={styles.rainbow__btn} data-btnText={btnText}></a>
      </Link>
    </div>
  );
}
