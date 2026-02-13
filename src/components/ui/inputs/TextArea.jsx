import styles from "../../../styles/home/HomePage.module.css";

// Placeholder for Textarea
const Textarea = ({ className, ...props }) => {
  return <textarea className={`${styles.textarea} ${className}`} {...props} />;
};

export default Textarea;