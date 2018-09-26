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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const stock_1 = require("../model/stock");
const stockOwned_1 = require("../model/stockOwned");
const stockPortfolio_1 = require("../model/stockPortfolio");
require("../sequelize");
let StockController = class StockController {
    constructor() {
        this.buildStaticData();
        //this.updateStocks();
    }
    // stocksList: Array<Stock> = new Array<Stock>();
    // stockBuySellHistory: Array<StockHistory> = new Array<StockHistory>();
    // stockIHave: Array<stockPortfolio> = new Array<stockPortfolio>();
    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    testingChanges() {
        // this.stocksList.forEach(stk => {
        //     const newPrice = stk.currentPrice + this.getRandomArbitrary(-1, 1);
        //     if (newPrice >= 0) {
        //         stk.currentPrice = newPrice;
        //     }
        // })
    }
    // createJson() {
    //     return { list: this.stocksList, history: this.stockBuySellHistory, having: this.stockIHave };
    // }
    getAllStocks() {
        return __awaiter(this, void 0, void 0, function* () {
            const allStocks = yield stock_1.Stock.findAll();
            const stocksHistory = yield stockOwned_1.StockHistory.findAll();
            const StocksPortfolio = yield stockPortfolio_1.stockPortfolio.findAll();
            // console.log(allStocks);
            return {
                list: allStocks.map((allStocks) => allStocks.toJSON()),
                history: stocksHistory.map((stocksHistory) => stocksHistory.toJSON()),
                having: StocksPortfolio.map((StocksPortfolio) => StocksPortfolio.toJSON())
            };
        });
    }
    buyStock(stocksymbol, quantityToBuy) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addToHistory(stocksymbol, quantityToBuy);
            this.addToPortfolio(stocksymbol, quantityToBuy);
            return this.getAllStocks();
            // return this.createJson();
        });
    }
    sellStock(stocksymbol, quantityToBuy) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addToHistory(stocksymbol, quantityToBuy * -1);
            this.addToPortfolio(stocksymbol, quantityToBuy * -1);
            return { stockName: stocksymbol, stockQuantity: quantityToBuy };
        });
    }
    addToPortfolio(stocksymbol, quantityToBuy) {
        /*
         Stock.find({
             where: {
                 symbol: stocksymbol
             }
         }).then(async stockToAdd => {
             if (stockToAdd != null) {
                 stockPortfolio.find({
                     where: {
                         symbol: stockToAdd.symbol
                     }
                 }
                  */
        stockPortfolio_1.stockPortfolio.find({
            where: {
                symbol: stocksymbol
            }
        }).then((stockToAddTo) => __awaiter(this, void 0, void 0, function* () {
            if (stockToAddTo != null) {
                const oldStockQuantity = stockToAddTo.dataValues.stockOwned;
                if (oldStockQuantity != null && (quantityToBuy + oldStockQuantity) != 0) {
                    stockPortfolio_1.stockPortfolio.update({
                        stockOwned: quantityToBuy + oldStockQuantity
                    }, { where: { symbol: stocksymbol } });
                }
                else if ((oldStockQuantity != null && quantityToBuy + oldStockQuantity) === 0) {
                    stockPortfolio_1.stockPortfolio.destroy({
                        where: {
                            symbol: stocksymbol
                        }
                    });
                }
            }
            else {
                stock_1.Stock.find({
                    where: {
                        symbol: stocksymbol
                    }
                }).then((stockToAdd) => __awaiter(this, void 0, void 0, function* () {
                    if (stockToAdd != null) {
                        const newToPortfolio = new stockPortfolio_1.stockPortfolio({
                            symbol: stockToAdd.symbol,
                            name: stockToAdd.name,
                            stockOwned: quantityToBuy
                        });
                        yield newToPortfolio.save();
                    }
                }));
            }
        }));
        // const newHistory = new StockOwned({
        //     symbol: stockToAdd.symbol,
        //     numberOfStockBuySell: quantityToBuy,
        //     buyingPrice: stockToAdd.currentPrice,
        //     dateOfPurchase: Date.now()
        // });
        // newHistory.save()
    }
    //     const buyibgInfo = this.stocksList.filter(i => i.symbol === stocksymbol)[0];
    //     const newStockToAdd: stockPortfolio = {
    //         symbol: buyibgInfo.symbol,
    //         name: buyibgInfo.name,
    //         stockOwned: quantityToBuy,
    //     };
    //     if (this.stockIHave.find(s => s.symbol === buyibgInfo.symbol)) {
    //         const ind = this.stockIHave.findIndex(i => i.symbol === buyibgInfo.symbol)
    //         this.stockIHave[ind].stockOwned = +quantityToBuy + +this.stockIHave[ind].stockOwned
    //     } else {
    //         this.stockIHave.push(newStockToAdd);
    //     }
    addToHistory(stocksymbol, quantityToBuy) {
        stock_1.Stock.find({
            where: {
                symbol: stocksymbol
            }
        }).then((stockToAdd) => __awaiter(this, void 0, void 0, function* () {
            if (stockToAdd != null) {
                const newHistory = new stockOwned_1.StockHistory({
                    symbol: stockToAdd.symbol,
                    numberOfStockBuySell: quantityToBuy,
                    buyingPrice: stockToAdd.currentPrice,
                    dateOfPurchase: Date.now()
                });
                yield newHistory.save();
            }
        }));
    }
    start(io) {
        io.on('connection', (x) => {
            let socket = null;
            console.log('a user connected');
            socket = x;
            socket.emit('updateStock', {});
        });
    }
    buildStaticData() {
        return __awaiter(this, void 0, void 0, function* () {
            const stock1 = new stock_1.Stock({
                symbol: `aaa`,
                name: `amit`,
                opanPrice: 10,
                currentPrice: 11
            });
            yield stock1.save();
            const stock2 = new stock_1.Stock({
                symbol: `bbb`,
                name: `amit2`,
                opanPrice: 12,
                currentPrice: 12
            });
            yield stock2.save();
            const stock3 = new stock_1.Stock({
                symbol: `ccc`,
                name: `amit3`,
                opanPrice: 15,
                currentPrice: 13
            });
            yield stock3.save();
            const stock13 = new stockOwned_1.StockHistory({
                symbol: `aaa`,
                numberOfStockBuySell: 12,
                buyingPrice: 10,
                dateOfPurchase: Date.now()
            });
            yield stock13.save();
            const stock15 = new stockOwned_1.StockHistory({
                symbol: `ccc`,
                numberOfStockBuySell: 6,
                buyingPrice: 15,
                dateOfPurchase: Date.now()
            });
            yield stock15.save();
            const stock16 = new stockOwned_1.StockHistory({
                symbol: `aaa`,
                numberOfStockBuySell: 7,
                buyingPrice: 16,
                dateOfPurchase: Date.now()
            });
            yield stock16.save();
            const stock17 = new stockPortfolio_1.stockPortfolio({
                symbol: `aaa`,
                name: `amit`,
                stockOwned: 19
            });
            console.log(stock17);
            yield stock17.save();
            const stock18 = new stockPortfolio_1.stockPortfolio({
                symbol: `ccc`,
                name: `amit3`,
                stockOwned: 6
            });
            yield stock18.save();
        });
    }
    testing() {
        return { testing: `testing` };
    }
};
__decorate([
    routing_controllers_1.Get("/stock")
    // getAll() {
    // return this.createJson();
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StockController.prototype, "getAllStocks", null);
__decorate([
    routing_controllers_1.Get("/buy/:stocksymbol/:quantityToBuy"),
    __param(0, routing_controllers_1.Param("stocksymbol")), __param(1, routing_controllers_1.Param("quantityToBuy")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "buyStock", null);
__decorate([
    routing_controllers_1.Get("/sell/:stocksymbol/:quantityToBuy"),
    __param(0, routing_controllers_1.Param("stocksymbol")), __param(1, routing_controllers_1.Param("quantityToBuy")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "sellStock", null);
__decorate([
    routing_controllers_1.Get("/testing"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StockController.prototype, "testing", null);
StockController = __decorate([
    routing_controllers_1.Controller(),
    __metadata("design:paramtypes", [])
], StockController);
exports.StockController = StockController;
//# sourceMappingURL=stock.controller.js.map