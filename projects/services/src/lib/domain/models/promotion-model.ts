export interface PromotionModel {
    idPromotion?: number;
    title?:       string;
    description?: string;
    startDate?:   Date;
    endDate?:     Date;
    base64Url?:   string;
    discount?:    number;
    idProduct?:   number;
    idCategory?:  number;
    state?:       boolean;
    color?:       string;
}