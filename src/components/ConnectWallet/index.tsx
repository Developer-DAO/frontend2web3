import styles from './index.module.css';
import { motion } from 'framer-motion';

interface Props {
  setIsOpen: any;
}

const ConnectWallet = ({ setIsOpen }: Props) => {
  return (
    <motion.div
      // Giving the Button some animations
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.1 }}
      className={styles.buttonContainer}
    >
      <div className={styles.buttonBackground}></div>
      <button onClick={() => setIsOpen(true)} className={styles.button}>
        Connect Wallet
      </button>
    </motion.div>
  );
};

export default ConnectWallet;
