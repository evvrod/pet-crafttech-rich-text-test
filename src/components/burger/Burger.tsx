import styles from './Burger.module.scss';

interface IBurgerProps {
  isActive: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function Burger(props: IBurgerProps) {
  const { isActive, setIsOpen } = props;

  return (
    <div
      className={`${styles.burger} ${isActive ? styles.active : ''}`}
      onClick={() => setIsOpen(!isActive)}
    >
      <span className={`${styles.line} ${styles.lineTop}`} />
      <span className={`${styles.line} ${styles.lineMiddle}`} />
      <span className={`${styles.line} ${styles.lineBottom}`} />
    </div>
  );
}
