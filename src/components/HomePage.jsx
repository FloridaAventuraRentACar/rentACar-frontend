import styles from '../styles/HomePage.module.css';
import HomeRentInput from './HomeRentInput';

export function HomePage() {
    return (
        <div className={styles.homeMainContainer}>
            <div className={styles.homeInnerContainer}>
                <h1 className={styles.heading}>
                    Bienvenido a Florida Aventura Rent A Car
                </h1>
                <HomeRentInput />
            </div>
        </div>
    );
}
