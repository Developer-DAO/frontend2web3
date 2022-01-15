import styles from './index.module.css';

interface Props {
  setIsOpen: any;
}

const ConnectWallet = ({ setIsOpen }: Props) => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.buttonBackground}></div>
      <button onClick={() => setIsOpen(true)} className={styles.button}>
        Connect Wallet
      </button>
    </div>
  );
};

export default ConnectWallet;
