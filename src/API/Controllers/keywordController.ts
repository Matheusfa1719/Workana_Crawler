import express from 'express';
import Keywords from '../../database/Models/Keywords';

const router = express.Router();

router.post('/create', (req, res) => {
    const keyWord = req.body.palavra_chave

    Keywords.findOne({ where: { palavra_chave: keyWord } }).then(async keyword => {
        if (keyword === null) {
            Keywords.create({
                palavra_chave: keyWord,
                is_active: 1
            }).then(() => {
                res.status(201);
                res.json({ message: 'Sucesso ao cadastrar palavra chave' });
            }).catch((error) => {
                res.status(400)
                res.json({ error: 'Bad request' })
            });

        } else {
            res.status(200);
            res.json({ message: 'Palavra chave já cadastrada' });
        }
    });
});


router.get('/list-all', (req, res) => {
    Keywords.findAll().then((data) => {
        res.status(200);
        res.json({ keywords: data })
    }).catch((error) => {
        res.status(400);
        res.json({ Error: 'Bad request' });
    });
});

router.get('/list-active', (req, res) => {
    Keywords.findAll({ where: { is_active: 1 } }).then((data) => {
        res.json({ keywords: data })
    }).catch((error) => {
        res.status(400);
        res.json({ Error: 'Bad request' });
    });
});

router.put('/alter-state/:id/:active', (req, res) => {
    const id: number = parseInt(req.params.id);
    const active: string = req.params.active;

    Keywords.findOne({ where: { id: id } }).then((keyword) => {
        if (keyword === null) {
            res.status(200);
            res.json({ message: 'ID não localizado, por favor valide' });
        } else {
            if (active === '0' || active === '1') {
                Keywords.update({
                    is_active: active
                }, { where: { id: id } })
                    .then(() => {
                        res.status(201);
                        res.json({ Message: 'Palavra-chave atualizada' })
                    }).catch((error) => {
                        res.status(400);
                        res.json({ Error: 'Bad request' });
                    });
            } else {
                res.json({ Error: 'Valor inválido, coloque 0 para desabilitar ou 1 para ativar' });
            }
        }
    });
});
export default router