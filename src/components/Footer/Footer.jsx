import styles from './Footer.module.css';
import { SocialMediaButton } from './SocialMediaButton';
import { GoMarkGithub } from 'react-icons/go';
import { AiFillLinkedin } from 'react-icons/ai';
import { GrTwitter } from 'react-icons/gr';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.contactName}>
        Made by{' '}
        <a className={styles.link} href="/">
          Rafael Reis
        </a>
      </span>
      <ul className={styles.socialMediaListBox}>
        <SocialMediaButton icon={<GoMarkGithub size={20} color="#fff" />} link="https://github.com/RaelReis" />
        <SocialMediaButton icon={<AiFillLinkedin size={20} color="#fff" />} />
        <SocialMediaButton icon={<GrTwitter size={20} color="#fff" />} />
      </ul>
    </footer>
  );
}
