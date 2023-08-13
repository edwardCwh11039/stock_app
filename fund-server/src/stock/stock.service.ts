import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockEntity } from './entity/stock.entity';
import { CreateStockDTO } from './dto/create-stock.dto';
import { Repository } from 'typeorm';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockEntity)
    private stockRepository: Repository<StockEntity>,
  ) {}

  public async createStock(
    createStockDTO: CreateStockDTO,
  ): Promise<StockEntity> {
    return await this.stockRepository.save(createStockDTO);
  }

  public async getAllStocks(): Promise<StockEntity[]> {
    return await this.stockRepository.find();
  }

  public async getStockBySymbol(symbol: string): Promise<StockEntity> {
    return await this.stockRepository.findOne({
      where: { symbol: symbol },
    });
  }
}
