import { createPriceAdjustment, deletePriceAdjustment, getAllPriceAdjustments, updatePriceAdjustment } from "../../../services/PriceAdjustmentsService";
import PriceAdjustmentList from "./PriceAdjustmentList";
import styles from "../../../styles/admin/price-adjustments/PriceAdjustmentPage.module.css"
import AdminSideBar from "../dashboard/AdminSideBar";

export default function PriceAdjustmentPage() {

    return (
        <div className={styles.mainContainer}>
            <AdminSideBar />
            <PriceAdjustmentList fetchAdjustments={getAllPriceAdjustments} onSave={createPriceAdjustment} onUpdate={updatePriceAdjustment} onDelete={deletePriceAdjustment} />
        </div>
    );
}