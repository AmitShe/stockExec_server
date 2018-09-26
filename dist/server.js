"use strict";
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
const stock_controller_1 = require("./controllers/stock.controller");
// import start from "./controllers/stock.controller";
// import StockData from "./stockData"
// import { Stock } from "./model/stock";
const app = routing_controllers_1.createExpressServer({
    cors: true,
    controllers: [stock_controller_1.StockController]
});
let socket = null;
(() => __awaiter(this, void 0, void 0, function* () {
    let server = yield app.listen(3000);
    const io = require('socket.io').listen(server);
    // let StockController1 = require('./controllers/stock.controller');
    // StockController1.start(io);
    io.on('connection', (x) => {
        console.log('a user connected');
        socket = x;
        // setInterval(function(socket){
        // console.log("I'm testing");
        // socket.emit('testing', {});
        // } , 1000);
        socket.emit('testing', {});
        // const stocksL = StockData.stockList;
        // updateStock
        // setInterval(update(), 1000);
    });
    io.on('disconnect', () => {
        console.log('user disconnected');
        socket = null;
    });
}))();
//# sourceMappingURL=server.js.map