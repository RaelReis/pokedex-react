import styles from './SocialMediaButton.module.css';

export function SocialMediaButton({ icon, link }) {
  return (
    <li>
      <button style={{ backgroundColor: 'transparent' }}>
        <a className={styles.socialButton} href={link} target="_blank" rel="noopener noreferrer">
          {icon}
        </a>
      </button>
    </li>
  );
}
