import express from 'express';
import Projects from '../../database/Models/Projects';

const router = express.Router();

router.post('/create', (req, res) => {
    console.log('Nova execução')
    const titulo = req.body.titulo;
    const dataPublicacao = req.body.dataPublicacao;
    const linkProposta = req.body.linkProposta;
    const duracaoProjeto = req.body.duracaoProjeto
    const descricaoProjeto = req.body.descricaoProjeto;
    const keywordId = req.body.keywordId;

    Projects.findOne({ where: { linkProposta: linkProposta } }).then((project) => {
        if (project === null) {
            Projects.create({
                titulo: titulo,
                dataPublicacao: dataPublicacao,
                linkProposta: linkProposta,
                duracaoProjeto: duracaoProjeto,
                descricaoProjeto: descricaoProjeto,
                KeywordId: keywordId
            }).then(() => {
                res.status(201);
                res.json({ message: 'Sucesso ao cadastrar o projeto' })
            }).catch((error) => {
                res.status(400);
                res.json({ Err: 'Bad request' });
            });
        } else {
            res.status(200)
            res.json({ message: 'Projeto já cadastrado' });
        }
    })


});

router.get('/list-all', (req, res) => {
    Projects.findAll().then((data) => {
        res.status(200);
        res.json({ projects: data })
    }).catch((error) => {
        res.status(400);
        res.json({ Error: 'Bad request' });
    });
});

export default router;