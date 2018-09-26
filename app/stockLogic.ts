import stockPortfolio from "./model/stockPortfolio";
import Stock from "./model/stock";
import StockHistory from "./model/stockOwned";

export class stockLogic {

    static addToPortfolio(stocksymbol: string, quantityToBuy: number) {
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

    static addToHistory(stocksymbol: string, quantityToBuy: number) {
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


    static async buildStaticData() {
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

}