import "reflect-metadata";
import { Controller, Param, Get } from "routing-controllers";
import { Stock } from "../model/stock";
import { StockHistory } from "../model/stockOwned";
import { stockPortfolio } from "../model/stockPortfolio";
import {stockLogic}  from "../stockLogic";
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

    @Get("/buy/:stocksymbol/:quantityToBuy/:buyingPrice/:cost")
     buyStock(@Param("stocksymbol") stocksymbol: string, @Param("quantityToBuy") quantityToBuy: number, @Param("buyingPrice") buyingPrice: number, @Param("cost") cost: number) {
    stockLogic.addToHistory(stocksymbol, quantityToBuy, 0);
         stockLogic.addToPortfolio(stocksymbol, quantityToBuy, buyingPrice);
        return this.getAllStocks();
    }


    @Get("/sell/:stocksymbol/:quantityToSell/:Profit")
    sellStock(@Param("stocksymbol") stocksymbol: string, @Param("quantityToSell") quantityToSell: number, @Param("Profit") Profit: number) {
    stockLogic.addToHistory(stocksymbol, quantityToSell * -1, Profit);
         stockPortfolio.find({
            where: {
                symbol: stocksymbol
            }
        }
        ).then(stockToAddTo => {
        stockLogic.addToPortfolio(stocksymbol, quantityToSell * -1, stockToAddTo.avgBuyingPrice);
        });
        return this.getAllStocks();
    }

    constructor() {
        stockLogic.buildStaticData();
    }

}
