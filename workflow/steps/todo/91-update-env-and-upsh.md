# Update `.env.example` and `up.sh`

**Status:** todo

## What to do

Update `.env.example` with `NUXT_SESSION_PASSWORD` (and anything else the admin/migrate services now need) and update `up.sh` for the new services/messages (migrate + portal + admin). The goal is a clean bring-up from a fresh copy of the env file.

## Done criteria

`cp .env.example .env` + fill it in + `./up.sh` brings up migrate + portal + admin with no error.

## Original line

> Atualizar `.env.example` (`NUXT_SESSION_PASSWORD` e o que mais for necessário) e o `up.sh` (mensagens/serviços novos). ✔ `cp .env.example .env` + preencher + `./up.sh` sobe migrate + portal + admin sem erro.
