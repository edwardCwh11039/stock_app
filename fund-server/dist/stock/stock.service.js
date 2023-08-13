"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const stock_entity_1 = require("./entity/stock.entity");
const typeorm_2 = require("typeorm");
let StockService = exports.StockService = class StockService {
    constructor(stockRepository) {
        this.stockRepository = stockRepository;
    }
    async createStock(createStockDTO) {
        return await this.stockRepository.save(createStockDTO);
    }
    async getAllStocks() {
        return await this.stockRepository.find();
    }
    async getStockBySymbol(symbol) {
        return await this.stockRepository.findOne({
            where: { symbol: symbol },
        });
    }
};
exports.StockService = StockService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stock_entity_1.StockEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StockService);
//# sourceMappingURL=stock.service.js.map