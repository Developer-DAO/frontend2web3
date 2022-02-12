import Link from 'next/link';
import React from 'react';
import styles from './landingPageStyles/buttons.module.css';
import { motion } from 'framer-motion';
type Props = {
  width?: string;
  height?: string;
  url: string;
  btnText: string;
};

export default function RainbowButton({ url, btnText }: Props) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.1 }}>
      <div className={styles.buttonBackground}></div>
      <Link href={url}>
        <a className={styles.rainbow__btn}>{btnText}</a>
      </Link>
    </motion.div>
  );
}
