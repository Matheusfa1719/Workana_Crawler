# Web Crawler Workana

## Este projeto tem a finalidade de localizar projetos em massa na plataforma da Workana, a busca é realizada através de palavras chaves, sendo assim o freelancer consegue realizar um filtro dos projetos que lhe interessam ganhando tempo no seu dia a dia.
<hr>
<h3>Como executar o Crawler?</h3>

1- A primeira etapa é colocar a API do projeto para executar, sendo assim em seu prompt de comandos se direcione a pasta do projeto e use o comando: 
```
npm start ou yarn start
```
Caso a mensagem <strong>API is running</strong> apareça em seu console está tudo certo  :smile:

2- Cadastre alguma palavra chave através da rota da API /keywords/create ou diretamente no banco de dados, caso for utilizar a API verifique se está passando os parâmetros corretos no método POST.
```
const keyWord = req.body.palavra_chave
```
3- Verifque se a palavra chave foi cadastrada com sucesso através da rota /keywords/list-active, a respota será parecida com está:

```
{
    "keywords": [
        {
            "id": 1,
            "palavra_chave": "Automacao",
            "is_active": true,
            "createdAt": "2021-05-21T02:49:46.843Z",
            "updatedAt": "2021-05-22T00:10:26.775Z"
        }
    ]
}
```
4- Execute o Crawller utilizando o comando:
```
yarn run-crawler
```

> Status do projeto: Em desenvolvimento :warning:
