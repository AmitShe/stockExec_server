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

    @Get("/buy/:stocksymbol/:quantityToBuy")
    async buyStock(@Param("stocksymbol") stocksymbol: string, @Param("quantityToBuy") quantityToBuy: number) {
        stockLogic.addToHistory(stocksymbol, quantityToBuy);
        stockLogic.addToPortfolio(stocksymbol, quantityToBuy);
        return this.getAllStocks();
    }

    @Get("/sell/:stocksymbol/:quantityToSell")
     sellStock(@Param("stocksymbol") stocksymbol: string, @Param("quantityToSell") quantityToSell: number) {
        stockLogic.addToHistory(stocksymbol, quantityToSell * -1);
        stockLogic.addToPortfolio(stocksymbol, quantityToSell * -1);
        return this.getAllStocks();
    }

    constructor() {
        stockLogic.buildStaticData();
    }

}
