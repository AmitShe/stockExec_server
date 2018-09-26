import Stock from "./model/stock";

export class socketService {

    static async updateStockPrices(socket: any){
        const allStocks: Array<Stock> = await Stock.findAll();
        await allStocks.forEach( stockInData => {
            const oldPrice = stockInData.currentPrice;
            const newPrice = oldPrice + this.getRandomArbitrary(-1, 1);
            if (newPrice >= 0) {
                 Stock.update({
                    currentPrice: newPrice
                }, { where: { symbol: stockInData.symbol } })
              }
        });
        socket.emit('updateStock', allStocks);
    }

    static getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
      }
}
