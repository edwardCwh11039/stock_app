import { StockService } from './stock.service';
import { StockEntity } from './entity/stock.entity';
export declare class StockController {
    private stockService;
    constructor(stockService: StockService);
    getAllStocks(): Promise<StockEntity[]>;
    getStockById(symbol: string): Promise<StockEntity>;
}
