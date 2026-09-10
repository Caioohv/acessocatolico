# Create the master-user CLI script

**Status:** todo

## What to do

Create a script/CLI that creates the master user: it hashes the given password and upserts the `User` (role `master`), using the shared `@acesso/db` client. Document usage in the admin README. There is no public signup in v1, so this is the only way to create credentials. Match the hashing algorithm used by the login endpoint (step 69).

## Done criteria

Running the script creates/updates the user and login with those credentials works.

## Original line

> Criar um script/CLI de criação do usuário master (gera hash da senha e faz upsert do `User`), documentado no README do admin. ✔ Rodar o script cria/atualiza o usuário e o login com essas credenciais funciona.
