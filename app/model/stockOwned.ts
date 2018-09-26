import {Table, Column, Model, PrimaryKey, DataType} from 'sequelize-typescript';

@Table
export class StockHistory extends Model<StockHistory> {
    
    @Column(DataType.STRING)
    symbol!: string;
    @Column(DataType.DOUBLE)
    numberOfStockBuySell!: number;
    @Column(DataType.DOUBLE)
    buyingPrice!: number;
    @Column(DataType.DOUBLE)
    dateOfPurchase!: number;
}
export default StockHistory;