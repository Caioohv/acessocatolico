# Create the login endpoint

**Status:** done

## What to do

Create `POST /api/auth/login` in the admin that validates email + password against the `User` model (comparing the stored password hash) and, on success, creates the sealed session. Follow the `api-responses` skill: never leak internals, return generic messages on failure. Use a secure hash comparison (e.g. bcrypt/argon2 matching the CLI in step 73).

## Done criteria

A request with valid credentials returns 200 and sets the session cookie; invalid credentials return 401.

## Original line

> Criar `POST /api/auth/login` no admin: valida e-mail+senha contra `User` (compara hash) e cria a sessão. ✔ Requisição com credenciais válidas retorna 200 e seta o cookie de sessão; inválidas retornam 401.

## Summary

Created `admin/server/api/auth/login.post.ts` implementing `POST /api/auth/login`: validates email+password presence (422), looks up user by email, compares hash with `bcryptjs` (constant-time, same generic 401 for missing user or wrong password), and on success calls `setUserSession` from `nuxt-auth-utils` to seal and set the session cookie and returns 200 with non-sensitive user fields. Added `bcryptjs@^2.4.3` to `admin/package.json` dependencies and `@types/bcryptjs@^2.4.6` to devDependencies.
