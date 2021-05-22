import { DataTypes } from 'sequelize';
import connection from '../connection';

const Keywords = connection.define('Keywords', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    palavra_chave: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

Keywords.sync({ alter: true })

export default Keywords