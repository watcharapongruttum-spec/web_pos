export interface ResSkuAll {
    sku_masters: SkuMaster[];
}

export interface SkuMaster {
    id:            number;
    name:          string;
    amount:        number;
    price:         string;
    created_at:    Date;
    updated_at:    Date;
    category_id:   number;
    category_name: CategoryName;
}

export enum CategoryName {
    ขนม = "ขนม",
    อาหาร = "อาหาร",
    เครื่องดื่ม = "เครื่องดื่ม",
}
