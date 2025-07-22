import styles from "../../styles/HomePage.module.css";

// Placeholder for Card and CardContent
const Card = ({ children, className }) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};

export default Card;