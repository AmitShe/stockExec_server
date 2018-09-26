import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript';

@Table
export class Stock extends Model<Stock> {

    @PrimaryKey
    @Column(DataType.STRING)
    symbol: string | undefined;
    @Column(DataType.STRING)
    name: string | undefined;
    @Column(DataType.DOUBLE)
    opanPrice: number | undefined;
    @Column(DataType.DOUBLE)
    currentPrice: number | undefined;
}
export default Stock;