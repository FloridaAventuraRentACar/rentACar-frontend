import styles from "../../../styles/home/HomePage.module.css";

// Placeholder for Input
const Input = ({ className, ...props }) => {
  return <input className={`${styles.input} ${className}`} {...props} />;
};

export default Input;