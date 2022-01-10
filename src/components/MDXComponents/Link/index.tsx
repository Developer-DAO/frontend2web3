import styles from './index.module.css';

const Link = ({ url, text }: any) => {
  return (
    <span>
      <a className={styles.link} href={url} target="_blank" rel="noreferrer">
        {text}
      </a>
    </span>
  );
};

export default Link;
