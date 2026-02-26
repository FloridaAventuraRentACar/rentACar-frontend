import { PriceAdjustment, PriceAdjustmentCreate } from "../types/PriceAdjustment"
import axiosInstance from "./axiosInstance"

export const getAllPriceAdjustments = async (): Promise<{ data: PriceAdjustment[] }> => {
    return axiosInstance.get("/price-adjustment")
}

export const createPriceAdjustment = async (data: PriceAdjustmentCreate): Promise<{ data: PriceAdjustment }> => {
    return axiosInstance.post("/price-adjustment", data)
}

export const updatePriceAdjustment = async (id: number, data: Omit<PriceAdjustment, "id" | "active">): Promise<{ data: PriceAdjustment }> => {
    return axiosInstance.put(`/price-adjustment/${id}`, data)
}

export const deletePriceAdjustment = async (id: number): Promise<void> => {
    return axiosInstance.delete(`/price-adjustment/${id}`)
}