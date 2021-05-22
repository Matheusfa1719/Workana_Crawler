import puppeteer from 'puppeteer';
import api from './services/api';

import { Ikeywords, Ikeyword } from './interfaces/keyword'
import { IProjeto } from './interfaces/projeto';

export async function crawlerWorkana() {

    console.log('Iniciando Crawller');
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();
    const listKeywordActive: Ikeywords = await api.get('/keyword/list-active').then((keywords) => {
        return keywords.data
    }).catch((err) => {
        throw err
    });
    //Validar esse Loop
    listKeywordActive.keywords.map(async (keyword) => {
        const linkProjetos = `https://www.workana.com/jobs?category=it-programming&language=pt&query=${keyword.palavra_chave}`;
        await page.goto(linkProjetos, { waitUntil: 'networkidle0' }).catch(e => void 0);
        await page.waitForSelector('#Query');
        const projetos = await page.evaluate((keyword) => {
            const qtdProjetos = document.getElementsByClassName('project-item').length
            const arrayProjetos: IProjeto[] = []
            for (let i = 0; i < qtdProjetos; i++) {
                const projeto: HTMLElement | any = document.getElementsByClassName('project-item')[i]; //Verificar a tipagem
                const titleProject = projeto.querySelector('.project-header > h2 > a > span').getAttribute('title');
                const dateProject = projeto.querySelector('.project-header > h5').getAttribute('title');
                const linkProposta = projeto.querySelector('.project-header > h2 > a').href;
                const duracaoProjeto = projeto.querySelector('.project-body > div > span').innerText
                const btnVerMais = projeto.querySelectorAll('.more-link')[0]
                if (btnVerMais !== undefined) {
                    projeto.querySelectorAll('.more-link')[0].click();
                }
                const descricaoProjeto = projeto.querySelectorAll('.project-body > .html-desc')[0].innerText;
                const objProjeto: IProjeto = { titulo: titleProject, dataPublicacao: dateProject, linkProposta: linkProposta, duracaoProjeto: duracaoProjeto, descricaoProjeto: descricaoProjeto, keywordId: keyword };
                arrayProjetos.push(objProjeto)
            }
            return arrayProjetos
        }, keyword.id);
        //Inserindo os projetos  no banco de dados
        projetos.forEach(async (projeto) => {
            await api.post('/projects/create', projeto).then(() => {
                console.log('Requisição feita com sucesso');
            }).catch((error) => {
                console.log(error);
            })
        });
    });

}

crawlerWorkana();