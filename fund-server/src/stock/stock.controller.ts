import { Controller, Get, Param, Query } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockEntity } from './entity/stock.entity';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('stock')
@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get('all')
  findAll(): Promise<StockEntity[]> {
    return this.stockService.getAllStocks();
  }

  @Get(':symbol')
  findOne(@Param('symbol') symbol: string) {
    return this.stockService.getStockBySymbol(symbol);
  }

  @ApiQuery({
    name: 'query',
    type: 'string',
    description: 'stock name',
    required: false,
  })
  @Get()
  search(@Query('query') query: string) {
    return this.stockService.getStocks(query);
  }
}
