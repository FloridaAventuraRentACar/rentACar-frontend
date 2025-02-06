import { useLocation } from 'react-router-dom'
import '../styles/carRentalPage.css'

export function CarRentalPage() {

    const location = useLocation(); //Este useState se usa para pasar datos entre componentes
    const { carData } = location.state || {};

    return (
        <div className="car-rental-main-conteiner">
            <div className="image-containter">
                <img 
                    src={carData.image} 
                    alt={carData.name} 
                    className="car-image" >
                </img>  
            </div>
            <div className="info-container">
                <button>Reservar</button>
            </div>
        </div>
    )
}