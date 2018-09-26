import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { StockController } from "./controllers/stock.controller";
import { socketService } from "./socketService";

const app = createExpressServer({
    cors: true,
    controllers: [StockController]
});

let socket = null;

(async () => {
    let server = await app.listen(3000);
    const io = require('socket.io').listen(server);
    io.on('connection', (x: any) => {
        console.log('a user connected');
        socket = x;
        setInterval(() => socketService.updateStockPrices(socket),5000);
    });
    io.on('disconnect', () => {
        console.log('user disconnected');
        socket = null;
    });
})()





