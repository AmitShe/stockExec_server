import "reflect-metadata";
import { Controller, Param, Get } from "routing-controllers";
import { Stock } from "../model/stock";
import { StockHistory } from "../model/stockOwned";
import { stockPortfolio } from "../model/stockPortfolio";
import "../sequelize";


@Controller()
export class StockController {

    getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    @Get("/stock")
    async getAllStocks() {
        const allStocks: Array<Stock> = await Stock.findAll();
        const stocksHistory: Array<StockHistory> = await StockHistory.findAll();
        const StocksPortfolio: Array<stockPortfolio> = await stockPortfolio.findAll();
        return {
            list: allStocks.map((allStocks: Stock) => allStocks.toJSON()),
            history: stocksHistory.map((stocksHistory: StockHistory) => stocksHistory.toJSON()),
            having: StocksPortfolio.map((StocksPortfolio: stockPortfolio) => StocksPortfolio.toJSON())
        };
    }

    @Get("/buy/:stocksymbol/:quantityToBuy")
    async buyStock(@Param("stocksymbol") stocksymbol: string, @Param("quantityToBuy") quantityToBuy: number) {
        await this.addToHistory(stocksymbol, quantityToBuy);
        this.addToPortfolio(stocksymbol, quantityToBuy);
        return this.getAllStocks();
        // return this.createJson();
    }

    @Get("/sell/:stocksymbol/:quantityToBuy")
    async sellStock(@Param("stocksymbol") stocksymbol: string, @Param("quantityToBuy") quantityToBuy: number) {
        await this.addToHistory(stocksymbol, quantityToBuy * -1);
        this.addToPortfolio(stocksymbol, quantityToBuy * -1);
        return { stockName: stocksymbol, stockQuantity: quantityToBuy };
    }

    addToPortfolio(stocksymbol: string, quantityToBuy: number) {
        stockPortfolio.find({
            where: {
                symbol: stocksymbol
            }
        }
        ).then(async stockToAddTo => {
            if (stockToAddTo != null) {
                const oldStockQuantity = stockToAddTo.dataValues.stockOwned;
                if (oldStockQuantity != null && (quantityToBuy + oldStockQuantity) != 0) {
                    stockPortfolio.update({
                        stockOwned: quantityToBuy + oldStockQuantity
                    }, { where: { symbol: stocksymbol } })
                }
                else if ((oldStockQuantity != null && quantityToBuy + oldStockQuantity) === 0) {
                    stockPortfolio.destroy({
                        where: {
                            symbol: stocksymbol
                        }
                    });

                }
            }
            else {
                Stock.find({
                    where: {
                        symbol: stocksymbol
                    }
                }).then(async stockToAdd => {
                    if (stockToAdd != null) {
                        const newToPortfolio = new stockPortfolio({
                            symbol: stockToAdd.symbol,
                            name: stockToAdd.name,
                            stockOwned: quantityToBuy
                        });
                        await newToPortfolio.save();
                    }
                })
            }
        }
        );
    }

    addToHistory(stocksymbol: string, quantityToBuy: number) {
        Stock.find({
            where: {
                symbol: stocksymbol
            }
        }).then(async stockToAdd => {
            if (stockToAdd != null) {
                const newHistory = new StockHistory({
                    symbol: stockToAdd.symbol,
                    numberOfStockBuySell: quantityToBuy,
                    buyingPrice: stockToAdd.currentPrice,
                    dateOfPurchase: Date.now()
                });
                await newHistory.save()
            }
        });
    }
    start(io: any) {

        io.on('connection', (x: any) => {
            let socket = null;
            console.log('a user connected');
            socket = x;
            socket.emit('updateStock', {});
        }); 
    }

constructor() {
                this.buildStaticData();
            }

async buildStaticData() {
                const stock1 = new Stock({
                    symbol: `aaa`,
                    name: `amit`,
                    opanPrice: 10,
                    currentPrice: 11
                });
                await stock1.save()
    const stock2 = new Stock({
                    symbol: `bbb`,
                    name: `amit2`,
                    opanPrice: 12,
                    currentPrice: 12
                });
                await stock2.save()
    const stock3 = new Stock({
                    symbol: `ccc`,
                    name: `amit3`,
                    opanPrice: 15,
                    currentPrice: 13
                });
                await stock3.save()
    const stock13 = new StockHistory({
                    symbol: `aaa`,
                    numberOfStockBuySell: 12,
                    buyingPrice: 10,
                    dateOfPurchase: Date.now()
                });
                await stock13.save()
    const stock15 = new StockHistory({
                    symbol: `ccc`,
                    numberOfStockBuySell: 6,
                    buyingPrice: 15,
                    dateOfPurchase: Date.now()
                });
                await stock15.save()
    const stock16 = new StockHistory({
                    symbol: `aaa`,
                    numberOfStockBuySell: 7,
                    buyingPrice: 16,
                    dateOfPurchase: Date.now()
                });
                await stock16.save()
    const stock17 = new stockPortfolio({
                    symbol: `aaa`,
                    name: `amit`,
                    stockOwned: 19
                });
                console.log(stock17);
                await stock17.save()
    const stock18 = new stockPortfolio({
                    symbol: `ccc`,
                    name: `amit3`,
                    stockOwned: 6
                });
                await stock18.save()
            }

// @Get("/testing")
//         testing() {
//             return { testing: `testing` };
//         }
    }
