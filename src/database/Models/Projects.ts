import { DataTypes } from 'sequelize';
import connection from '../connection';
import Keywords from './Keywords';

const Projects = connection.define('Projects', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
    },
    dataPublicacao: {
        type: DataTypes.STRING
    },
    linkProposta: {
        type: DataTypes.STRING
    },
    duracaoProjeto: {
        type: DataTypes.STRING
    },
    descricaoProjeto: {
        type: DataTypes.STRING
    }
});

Keywords.hasMany(Projects);
Projects.belongsTo(Keywords);

Projects.sync({ alter: true });

export default Projects;