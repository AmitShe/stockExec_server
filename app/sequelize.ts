import { Sequelize } from 'sequelize-typescript';
// console.log('2')
syncDataBase().catch(function(err) {
    console.log(err);}
);

async function syncDataBase(): Promise<any> {
  // console.log('1')
 const sequelize = await new Sequelize({
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op as any,
  database: 'stockDB',
  username: 'amit',
  password: '1234',
  host: 'localhost',
  port: 3030,
  logging: false,
  modelPaths: [__dirname + '/model']
})

await sequelize.sync({ force: true });
//   await sequelize.sync({ force: false });
};


/*
docker run --rm -p 3030:5432 --name stocks_db -e POSTGRES_PASSWORD="1234" -e POSTGRES_USER="amit" -e POSTGRES_DB="stockDB" -d postgres
*/ 
