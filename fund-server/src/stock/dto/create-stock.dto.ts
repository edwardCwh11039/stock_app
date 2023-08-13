import { ApiProperty } from '@nestjs/swagger';

export class CreateStockDTO {
  @ApiProperty()
  symbol: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  LogoUrl: string;

  @ApiProperty()
  marketCap: string;

  @ApiProperty()
  Revenue: string;

  @ApiProperty()
  PriceChange: string;

  @ApiProperty()
  Price: number;
}
