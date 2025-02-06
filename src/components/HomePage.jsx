import '../styles/homePage.css'
import HomeRentInput from './HomeRentInput'

export function HomePage() {
    return (
        <div className="home-main-container">
            <div className="home-inner-container">
            <h1 className="heading">
                Welcome to Our Car Rental Service
            </h1>
            <HomeRentInput />
            </div>
        </div>
    )
}