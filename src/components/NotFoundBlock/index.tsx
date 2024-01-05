import styles from './NotFoundBlock.module.scss';
const NotFoundBlock: React.FC = () => {
  return (
    <h1 className={styles.root}>
      <span className={styles.newClass}>sorry </span>ничего не наидено
    </h1>
  );
};

export default NotFoundBlock;
