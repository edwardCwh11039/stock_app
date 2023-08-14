import { StockService } from './stock.service';
import { StockEntity } from './entity/stock.entity';
export declare class StockController {
    private stockService;
    constructor(stockService: StockService);
    findAll(): Promise<StockEntity[]>;
    findOne(symbol: string): Promise<StockEntity>;
    search(query: string): Promise<StockEntity[]>;
}
