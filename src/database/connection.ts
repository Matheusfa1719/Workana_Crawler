import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/database/database.sqlite',
    logging: false
});

export default sequelize