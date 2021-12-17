import styles from './LoadingSpinner.module.css';

export function LoadingSpinner({ ...props }) {
  return <div {...props} className={styles.loader} />;
}
