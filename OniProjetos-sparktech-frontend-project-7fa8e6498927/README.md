# Sparktech Frontend Test Project (sparktech-frontend-project)

Um projeto de teste para desenvolvimento frontend da Sparktech, com Vue 3 e Quasar 2.

O objetivo deste teste é partindo deste projeto base construir uma tela de cadastro de usuários, de acordo com modelos do Figma.

A API de backend para cadastro e consulta dos usuários também está disponível abaixo. Qualquer problema, entrar em contato com o Matheus ou o Sandro.

## Modelos de telas
https://www.figma.com/file/o7Nkq5mKn4013EPTYsl6Da/Telas-de-Teste-Usu%C3%A1rio?node-id=0%3A1


## Backend API
```bash
-- GET http://homolog-api.gm7.com.br/orq/teste/user
-- GET http://homolog-api.gm7.com.br/orq/teste/user/active
-- GET http://homolog-api.gm7.com.br/orq/teste/user/{id}
-- GET http://homolog-api.gm7.com.br/orq/teste/user/name/{name}
-- POST http://homolog-api.gm7.com.br/orq/teste/user
-- PUT http://homolog-api.gm7.com.br/orq/teste/user/{id}
-- DELETE http://homolog-api.gm7.com.br/orq/teste/user/{id}
```


## Install the dependencies
```bash
yarn
# or
npm install
```


### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
