export interface PromotionDto {
    idPromotion?: number;
    title?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    categoryId?: number;
    productId?: number;
    discount?: number;
    color?: string;
    urlImage?: string;
}
