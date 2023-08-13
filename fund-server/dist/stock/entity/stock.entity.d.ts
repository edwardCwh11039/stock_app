import { BaseEntity } from 'typeorm';
export declare class StockEntity extends BaseEntity {
    id: number;
    symbol: string;
    companyName: string;
    logoUrl: string;
    marketCap: string;
    revenue: string;
    priceChange: string;
    price: number;
}
