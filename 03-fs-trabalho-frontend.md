## Fullstack - Trabalho 03 - Frontend

Desenvolver um frontend utilizando **Antd** para criar uma interface de usuário e interagir com os endpoints criados no trabalho anterior.


### Dica

- No projeto *backend* instalar o **cors**

    `npm install --save cors`

- No *index.js* incluir

    ```javascript

    var cors = require("cors");

    app.use(cors());

    ```

Os seguintes elementos devem estar presentes:

- Tela para criar um novo usuário
- Tela de login
- Tela para criar a lista de prêmios e permitir a sua alteração e exclusão
- Cadastro de um prêmio para um usuário específico
- Exibir uma lista com todos os prêmios recebidos pelo usuário
- Exibir o total de pontos acumulados pelo usuário
