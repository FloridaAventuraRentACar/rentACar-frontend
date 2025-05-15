import '../styles/homePage.css'
import HomeRentInput from './HomeRentInput'

export function HomePage() {
    return (
        <div className="home-main-container">
            <div className="home-inner-container">
                <h1 className="heading">
                    Bienvenido a Florida Aventura Rent A Car
                </h1>
                <HomeRentInput />
            </div>
        </div>
    )
}