# Criar arquivo de variáveis modelo .env.example

**Status:** done

## What to do

Criar o arquivo `portal/.env.example` documentando a variável de ambiente `DATABASE_URL` para conexão com o PostgreSQL (`postgresql://usuario:senha@localhost:5432/acessocatolico?schema=public`). O arquivo servirá como modelo tanto para desenvolvimento local quanto para o deploy final na VPS. Não colocar credenciais reais no arquivo.

## Original line

> - [ ] Criar arquivo de variáveis de ambiente modelo `portal/.env.example` com a chave `DATABASE_URL`. ✔ Arquivo criado com string de conexão PostgreSQL documentada.

## Summary

Criado `portal/.env.example` documentando a variável `DATABASE_URL` com string de conexão PostgreSQL de placeholder (`postgresql://usuario:senha@localhost:5432/acessocatolico?schema=public`), sem credenciais reais. O `portal/.gitignore` já ignora `.env` e faz whitelist de `.env.example` (`!.env.example`), então o modelo é versionado enquanto o `.env` real permanece fora do controle.
