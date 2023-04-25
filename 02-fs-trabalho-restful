## Fullstack - Trabalho 02 - Camada de Serviços

Utilizando o trabalho anterior como base, criar a camada de serviços para que usuários possam acessar via enpoints Restful as funções de persistência do sistema de reciclagem.

## Entrega

- O trabalho deve ser individual

- Efetuar a entrega por meio do canvas enviando **APENAS** os arquivos **.js** ou URL para repositório **git**

## Rotas

- Criar 3 rotas: *usuario*, *premio* e *reciclagem*

## Endpoints

- `/usuario` (POST): cria um novo usuário
  - Utilizar o **Express Validator** para obrigar que a senha tenha no mínimo 6 dígitos
- `/usuario/{id}` (GET): obtém um usuário pelo `id`
- `/usuario/{id}` (PUT): atualiza um usuário pelo `id`
- `/usuario/{id}` (DELETE): remove um usuário pelo `id`
- `/usuario/login` (POST): efetuar o login do usuário e retorna um **token** composto pelo **nome** e **_id**
- `/premio` (POST): cadastra um novo prêmio
- `/premio/{id}` (GET): obtém um prêmio pelo `id`
- `/premio/{id}` (PUT): atualizar um prêmio pelo `id`
- `/premio/{id}` (DELETE): remover um prêmio pelo `id`
- `/premio` (GET): lista todos os prêmios
- `/premio/disponivel/{pontos}` (GET): listar todos os prêmios disponíveis de acordo com os `pontos` necessários 
- `/reciclagem/{id}` (POST): incluir um registro de reciclagem pelo `id` do usuário
- `/reciclagem/{id}` (GET): lista todos os itens reciclados do usuário `id`
- `/reciclagem/total/{id}` (GET): retornar o total de pontos e pesos de itens reciclados pelo usuário `id`
- `/reciclagem/premio/{id}` (GET): subtrair 1 da quantidade disponível do prêmio `id`

- Obs: retornar o código de erro quando apropriado:
  - 200 - requisição e resposta realizados com sucesso
  - 404 - recursos não localizado (por exemplo, em uma busca por id)
  - 401 - usuário não atuorizado a realizar a operação
  - 400 - requisição mal formulada (por exemplo, falta de um parâmetro)

- Para as rotas *premio* e *reciclagem* verificar a existência do **token** gerado no **endpoint** `/usuario/login`. Caso não exista, retornar 401
- Documentar os **endpoints** `/usuario` (POST) e `/reciclagem/{id}` (GET) utilizando o padrão **OpenAPI / swagger** 