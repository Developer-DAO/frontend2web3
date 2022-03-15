import * as React from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import ConnectWallet from '../ConnectWallet';
import Image from 'next/image';
import styles from './index.module.css';
import { ConnectOptions } from '..';
import { useAccount } from 'wagmi';

import { UserContext } from '@/contexts/UserContext';
import '@fontsource/plus-jakarta-sans';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const divRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);
  const { authenticated } = React.useContext(UserContext);
  const [{ data }, disconnect] = useAccount({ fetchEns: true });
  const isAuthenticated = authenticated && data;
  const getDisplayName = () => {
    if (data?.ens?.name) {
      return data?.ens?.name;
    } else {
      const add = data?.address as string;
      const truncate = add.slice(add.length - 4);
      return `0x...${truncate}`;
    }
  };

  //Detect route change
  React.useEffect(() => {
    const handleRouteChange = () => {
      //unfocus popup after route change
      if (divRef.current !== null) {
        divRef.current.focus();
      }
      setShowPopup(false);
    };

    router.events.on(`routeChangeStart`, handleRouteChange);

    return () => {
      router.events.off(`routeChangeStart`, handleRouteChange);
    };
  }, [router.events]);

  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement(`#nav`);

  const handleDisconnect = async () => {
    const res = await fetch(`/api/auth/logout`);
    if (!res.ok) throw new Error(`Error logging out`);
    disconnect();
  };

  return (
    <>
      <nav id="nav" className={styles.nav} tabIndex={0} ref={divRef}>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel={`Select A Wallet Connect Option`}
          portalClassName={styles.modal}
          style={{
            content: {
              width: `65%`,
              height: `65%`,
              margin: `5% auto`,
              backgroundColor: `#343436`,
            },
          }}
        >
          <ConnectOptions closeModal={() => setIsOpen(false)} />
        </Modal>
        <div className={styles.navLeft}>
          <Link href="/" passHref>
            <div className={styles.linkContainer}>
              <Image
                src="/images/icon.svg"
                alt=""
                width={`100%`}
                height={`100%`}
                className={styles.logo}
              />
            </div>
          </Link>
          <div className={styles.linkWrapper}>
            <Link href="/lessons">
              <a className={styles.links}>Lessons</a>
            </Link>
            <Link href="/videos">
              <a className={styles.links}>Videos</a>
            </Link>
            <Link href="/about">
              <a className={styles.links}>About</a>
            </Link>
          </div>
        </div>
        {isAuthenticated ? (
          <div
            tabIndex={1}
            className={styles.sideMenu}
            onFocus={() => setShowPopup(true)}
            onBlur={() => setShowPopup(false)}
          >
            <div className={styles.buttonBackground}></div>
            <div className={styles.profileWrapper}>
              <div className={styles.displayname}> {getDisplayName()}</div>
            </div>

            <>
              <AnimatePresence>
                {showPopup && (
                  <motion.div
                    initial={{ y: -13 }}
                    animate={{ y: 5 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${styles.popup} ${
                      showPopup && styles.visible
                    } `}
                  >
                    <Link href="/profile" passHref>
                      <div className={`${styles.popupMenu}`}>Profile</div>
                    </Link>
                    <div
                      onClick={() => handleDisconnect()}
                      className={`${styles.popupMenu}  ${styles.popupMenuDisconnect}`}
                    >
                      Disconnect
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          </div>
        ) : (
          <ConnectWallet setIsOpen={setIsOpen} />
        )}
      </nav>
      {children}
    </>
  );
};

export default Layout;
