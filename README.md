# Trybe Challenge Fullstack

> Desafio técnico Fullstack feito em NestJS + NextJS - [Link do Projeto](https://github.com/betrybe/technical-test)

## Requisitos do Projeto

- Node 12
- Yarn

## Setup do Projeto

Para rodar o backend na porta 3001:

```sh
cd backend
yarn
yarn build
yarn dev
```

Para rodar o backend na porta 3000:

```sh
cd frontend
yarn
yarn build
yarn dev
```

## Endpoints do Backend

- `POST /api/login`: Login do usuário
- `GET /api/crypto/btc`: Obter as cotações do bitcoin
- `POST /api/crypto/btc`: Alterar a cotação de uma moeda, baseada no dólar

## Rotas do Frontend

- `/login`: Tela de Login
- `/`: Tela com as cotações do Bitcoin
- `/update-currency`: Tela para atualizar uma cotação específica

## Testes (dentro de cada pasta)

```sh
yarn test
```

## Possíveis melhorias

- [ ] Frontend precisa de mais testes, coloquei apenas um de exemplo unitário, mas é possível configurar testes de snapshot e testes de integração Front <> API com o Jest e React Testing Tools + testes E2E com o Cypress
- [ ] Configurar o backend pra rodar em um Docker para facilitar os deploys (não fiz isso porque achei bem overkill para o desafio)
- [ ] Configurar CI/CD para o projeto (deploy do container do backend no Heroku + deploy do frontend no Vercel)
