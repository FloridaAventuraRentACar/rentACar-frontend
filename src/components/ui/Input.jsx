import styles from "../../styles/HomePage.module.css";

// Placeholder for Input
const Input = ({ className, ...props }) => {
  return <input className={`${styles.input} ${className}`} {...props} />;
};

export default Input;