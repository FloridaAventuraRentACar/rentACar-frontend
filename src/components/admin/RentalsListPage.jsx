import RentalsGrid from './RentalsGrid.jsx'
import styles from '../../styles/admin/RentalsListPage.module.css'

export default function RentalsListPage(){
    return (
        <div>
            <h1 className={styles.title}>Listado de alquileres</h1>
            <RentalsGrid />
        </div>
    )
}