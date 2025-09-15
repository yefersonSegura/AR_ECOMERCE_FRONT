export interface PromotionsDto {
    idPromotion?: number;
    title?:       string;
    description?: string;
    startDate?:   Date;
    endDate?:     Date;
    imageUrl?:    string;
    discount?:    number;
    idProduct?:   number;
    idCategory?:  number;
    state?:       boolean;
    color?:       string;
}
