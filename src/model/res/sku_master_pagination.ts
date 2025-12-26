export interface SkuMasterPagination {
    sku_masters: SkuMaster[];
    pagination:  Pagination;
}

export interface Pagination {
    page:        number;
    per_page:    number;
    total:       number;
    total_pages: number;
}

export interface SkuMaster {
    id:            number;
    name:          string;
    category_id:   number;
    amount:        number;
    created_at:    Date;
    updated_at:    Date;
    category_name: CategoryName;
    price_float:   number;
}

export enum CategoryName {
    ขนม = "ขนม",
    เครื่องดื่ม = "เครื่องดื่ม",
}
