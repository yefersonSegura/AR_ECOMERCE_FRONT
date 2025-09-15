export interface InoviceModel {
    grossTotal?: number;
    totalDiscount?: number;
    totalIGV?: number;
    totalGrandPrix?: number;
    status?: string;
    address?: string;
    paymentMethod?: string;
    items?: Detail[];
    userId?: number;
    orderDate?: Date;
}

export interface Detail {
    productID?: number;
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    categoryID?: number;
    urlImage?: string;
    categoryName?: string;
    quantity?: number;
    discount?: number;
}
