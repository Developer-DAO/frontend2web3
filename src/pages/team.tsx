import Image from 'next/image';
import Link from 'next/link';
import styles from './pageStyles/team.module.css';
import { FiTwitter, FiGlobe } from 'react-icons/fi';
const teamData = [
  {
    name: `Rahat Chowdhury`,
    bio: ` Founder/Lead Instructor`,
    image: `/images/rahat.png`,
    links: {
      twitter: `https://twitter.com/Rahatcodes`,
      website: `https://www.rahat.dev/`,
    },
  },
  {
    name: `Orlundo Hubbard`,
    bio: `Developer`,
    image: `/images/hubbard.jpg`,

    links: {
      twitter: `https://twitter.com/OrlundoH`,
      website: null,
    },
  },
  {
    name: `Yusuf Kehinde`,
    bio: `Frontend Developer`,
    image: `/images/kenny.jpg`,

    links: {
      twitter: `https://twitter.com/CodingMage`,
      website: `https://yusufkehinde.netlify.app`,
    },
  },
];
const Team = () => {
  return (
    <div className={styles.team}>
      <div className={styles.teamHeader}>Our team members</div>

      <div className={styles.teamInfo__container}>
        {teamData.map((item) => (
          <div key={item.name} className={styles.teamInfo}>
            <div className={styles.teamInfo__imgWrapper}>
              <Image
                src={item.image}
                alt=""
                width={176}
                height={176}
                className={styles.teamInfo__img}
              />
            </div>

            <div className={styles.teamInfo__name}>{item.name}</div>
            <div className={styles.teamInfo__bio}>{item.bio}</div>
            <div className={styles.teamInfo__links}>
              {item.links.twitter && (
                <Link href={item.links.twitter} passHref={true}>
                  <FiTwitter className={styles.link_icon} />
                </Link>
              )}

              {item.links.website && (
                <Link href={item.links.website} passHref={true}>
                  <FiGlobe className={styles.link_icon} />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
