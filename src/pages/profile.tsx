import { UserContext } from '@/contexts/UserContext';
import Image from 'next/image';
import * as React from 'react';
import ReactModal from 'react-modal';
import { useAccount } from 'wagmi';
import styles from './pageStyles/profile.module.css';
export interface IProfileProps {
  prop?: boolean;
}

export default function Profile(props: IProfileProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const { authenticated } = React.useContext(UserContext);
  const [{ data }] = useAccount({ fetchEns: true });
  const isAuthenticated = authenticated && data;

  const displayName = data?.ens?.name;
  const displayAddress = data?.address;

  return (
    <div>
      <div className={styles.profile__container}>
        <div className={styles.profilePic__wrapper}>
          <Image
            src="/images/web3.jpg"
            alt=""
            width={176}
            height={176}
            className={styles.profilePic__img}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.info__name}>
            {isAuthenticated && displayName ? displayName : `No name set`}
          </div>
          <div className={styles.info__add}>
            {isAuthenticated && displayAddress
              ? displayAddress
              : `No connected`}
          </div>
        </div>

        <div
          role="button"
          onClick={() => setIsOpen(true)}
          className={styles.add__info}
        ></div>
      </div>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel={`Select A Wallet Connect Option`}
        portalClassName={styles.modal}
        style={{
          overlay: {
            backgroundColor: `#0a0909ab`,
          },
          content: {
            maxWidth: `865px`,
            maxHeight: `532px`,
            width: `81%`,
            height: `100%`,
            margin: `5% auto`,
            backgroundColor: `#343436`,
            border: `1px solid black`,
            borderRadius: `15px`,
          },
        }}
      >
        <div>Modal</div>
      </ReactModal>
    </div>
  );
}
