import styles from "../../styles/HomePage.module.css";

// Placeholder for Button
const Button = ({ children, className, ...props }) => {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;