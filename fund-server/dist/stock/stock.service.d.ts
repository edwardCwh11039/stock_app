import { StockEntity } from './entity/stock.entity';
import { CreateStockDTO } from './dto/create-stock.dto';
import { Repository } from 'typeorm';
export declare class StockService {
    private stockRepository;
    constructor(stockRepository: Repository<StockEntity>);
    createStock(createStockDTO: CreateStockDTO): Promise<StockEntity>;
    getAllStocks(): Promise<StockEntity[]>;
    getStockBySymbol(symbol: string): Promise<StockEntity>;
    getStocks(symbol: string): Promise<StockEntity[]>;
}
