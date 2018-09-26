import {Table, Column, Model, PrimaryKey, DataType} from 'sequelize-typescript';

@Table
export class stockPortfolio extends Model<stockPortfolio>{
   
    @PrimaryKey
    @Column(DataType.STRING)
    symbol!: string;
    @Column(DataType.STRING)
    name!: string;
    @Column(DataType.DOUBLE)
    stockOwned!: number;
}
export default stockPortfolio;