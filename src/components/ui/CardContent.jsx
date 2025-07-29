import styles from "../../styles/HomePage.module.css";

const CardContent = ({ children, className }) => {
  return <div className={`${styles.cardContent} ${className}`}>{children}</div>;
};

export default CardContent;