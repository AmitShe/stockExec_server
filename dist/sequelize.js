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
const sequelize_typescript_1 = require("sequelize-typescript");
console.log('2');
syncDataBase().catch(function (err) {
    // print the error details
    console.log(err);
});
function syncDataBase() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('1');
        const sequelize = yield new sequelize_typescript_1.Sequelize({
            dialect: 'postgres',
            // operatorsAliases: false,
            operatorsAliases: sequelize_typescript_1.Sequelize.Op,
            database: 'stockDB',
            username: 'amit',
            password: '1234',
            host: 'localhost',
            port: 3030,
            logging: false,
            modelPaths: [__dirname + '/model']
        });
        //   sequelize.addModels([ActionInfo]);
        //   sequelize.addModels([Stock]);
        //   sequelize.addModels([StockOwned]);
        //   sequelize.addModels([stockPortfolio]);
        yield sequelize.sync({ force: true });
        //   await sequelize.sync({ force: false });
    });
}
;
/*
docker run --rm -p 3030:5432 --name stocks_db -e POSTGRES_PASSWORD="1234" -e POSTGRES_USER="amit" -e POSTGRES_DB="stockDB" -d postgres
*/
//# sourceMappingURL=sequelize.js.map