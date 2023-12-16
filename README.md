# Desafio Developer PSP - Pagway

É necessário docker e docker-compose para executar o banco de desenvolvimento.
```shell
docker volume create pgdata_pagway
docker volume create pgadmin
docker-compose up
```
Repare que na porta [5050](http://localhost:5050) fica disponível o pgadmin. Usuário e senha estão definidos no [docker-compose](./docker-compose.yaml).

Ou se preferir usar um banco próprio, na pasta [initdb.d](./initdb.d) estão as migrações utilizadas para configurar e iniciar as tabelas.

Talvez seja necessário alterar o arquivo `.env` com as variáveis atualizadas, siga o modelo [.dev.env](./.dev.env)

Para instalar as dependencias, no diretório clonado, execute:
```shell
npm i
```

Os testes unitário são executados com o seguinte comando:
```shell
npm test
```
depois `q` para sair

Após ligar o banco, para iniciar o servidos excute:
```shell
npm start
```
O arquivos [postman_collection](./postman_collection.json) contém as rotas salvas no postman para facilitar a inspeção (o insomnia consegue importar).

Ainda com o banco e o servidor ligado, você pode executar o teste da api com o seguinte comando:
```
npm run e2e
``` 