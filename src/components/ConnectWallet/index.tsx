import styles from './index.module.css';

interface Props {
  setIsOpen: any;
}

const ConnectWallet = ({ setIsOpen }: Props) => {
  return (
    <button onClick={() => setIsOpen(true)} className={styles.button}>
      Connect Wallet
    </button>
  );
};

export default ConnectWallet;
