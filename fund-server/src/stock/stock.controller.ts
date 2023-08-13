import { Controller, Get, Param } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockEntity } from './entity/stock.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stock')
@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get('all')
  public async getAllStocks(): Promise<StockEntity[]> {
    return this.stockService.getAllStocks();
  }

  @Get('/:symbol')
  public async getStockById(@Param('symbol') symbol: string) {
    return this.stockService.getStockBySymbol(symbol);
  }
}
