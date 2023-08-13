import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class StockEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @Column()
  companyName: string;

  @Column()
  logoUrl: string;

  @Column()
  marketCap: string;

  @Column()
  revenue: string;

  @Column()
  priceChange: string;

  @Column('float', { precision: 6, scale: 2 })
  price: number;
}
