export interface PriceAdjustment {
    id: number
    periodStart: string
    periodEnd: string
    type: "INCREASE" | "DECREASE"
    percentage: number
    reason?: string
    active: boolean
}

export interface PriceAdjustmentCreate extends Omit<PriceAdjustment, "id" | "active"> { }

export interface PriceAdjustmentUpdate extends Omit<PriceAdjustment, "id"> { }
