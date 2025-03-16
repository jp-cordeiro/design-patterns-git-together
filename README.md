## Descrição

Talk apresentada no evento Git Together Fortaleza no dia 15/03/2025 com o tema de Padrões de Projeto e com o nome: "Dois acoplamentos ou um Padrão de Projeto misterioso?".

Busco nessa apresentação falar um pouco sobre:

- Algumas das vantagens de usar padrões de projeto;
- Mostrar o que é e o que não é um Padrão de Projeto
- Apresentar as categorias de padrões catalogados pelo GoF (Erich Gamma, Richard Helm, Ralph Johnson e John Vlissides), falar sobre 4 desses padrões;
- Factory-Method;
- Strategy;
- Adapter;
- Decorator.

Link da apresentação: [Dois acoplamentos ou um Padrão de Projeto misterioso?](https://docs.google.com/presentation/d/1Cy4ZhoyD42P3Zm-d4Hxz7AbjoZiRESNQsyz3MtBhkgI)

## Iniciar o projeto

```bash
$ yarn install
```

## Rodar o projeto

```bash
# rodar o projeto
$ yarn run start

# rodar em modo de desenvolvimento
$ yarn run start:dev
```

## Rodar os testes

```bash
# Testes E2E
$ yarn run test:e2e
```

## Rodar com docker

```bash
# Por padrão o projeto irá rodar em modo debug
$ docker-compose up -d
```
