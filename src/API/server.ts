import express from 'express';
import cors from 'cors';
import connection from '../database/connection';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.get('/', (req, res) => {
    res.json({ message: 'API is working' })
})


app.listen(3333, () => {
    console.log('API is running')
});







