# Create the login endpoint

**Status:** todo

## What to do

Create `POST /api/auth/login` in the admin that validates email + password against the `User` model (comparing the stored password hash) and, on success, creates the sealed session. Follow the `api-responses` skill: never leak internals, return generic messages on failure. Use a secure hash comparison (e.g. bcrypt/argon2 matching the CLI in step 73).

## Done criteria

A request with valid credentials returns 200 and sets the session cookie; invalid credentials return 401.

## Original line

> Criar `POST /api/auth/login` no admin: valida e-mail+senha contra `User` (compara hash) e cria a sessão. ✔ Requisição com credenciais válidas retorna 200 e seta o cookie de sessão; inválidas retornam 401.
