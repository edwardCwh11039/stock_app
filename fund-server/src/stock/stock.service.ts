import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockEntity } from './entity/stock.entity';
import { CreateStockDTO } from './dto/create-stock.dto';
import { Like, Repository } from 'typeorm';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockEntity)
    private stockRepository: Repository<StockEntity>,
  ) {}

  async createStock(createStockDTO: CreateStockDTO): Promise<StockEntity> {
    return await this.stockRepository.save(createStockDTO);
  }

  async getAllStocks(): Promise<StockEntity[]> {
    return await this.stockRepository.find();
  }

  async getStockBySymbol(symbol: string): Promise<StockEntity> {
    return await this.stockRepository.findOne({
      where: { symbol: symbol },
    });
  }

  async getStocks(symbol: string): Promise<StockEntity[]> {
    return await this.stockRepository.find({
      where: { companyName: Like(`%${symbol}%`) },
    });
  }
}
