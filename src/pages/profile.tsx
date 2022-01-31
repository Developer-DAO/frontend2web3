import { UserContext } from '@/contexts/UserContext';
import Image from 'next/image';
import * as React from 'react';
import { useAccount } from 'wagmi';
import styles from './pageStyles/profile.module.css';
export interface IProfileProps {
  prop?: boolean;
}

export default function Profile(props: IProfileProps) {
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
      </div>
    </div>
  );
}
