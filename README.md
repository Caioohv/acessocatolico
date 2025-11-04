# 🙏 AcessoCatólico

Uma plataforma digital para conectar e fortalecer a comunidade católica, reunindo informações sobre missas, eventos, comunidades e atividades paroquiais.

## 🚀 Tecnologias

- **Frontend**: Nuxt 3 + Vue 3 + TypeScript
- **UI Framework**: Nuxt UI
- **Database**: MySQL + Prisma ORM
- **Authentication**: JWT + bcryptjs
- **State Management**: Pinia
- **Styling**: CSS customizado
- **Dev Tools**: ESLint + Prettier + Docker

## 🏗️ Setup do Projeto

### 1. Pré-requisitos

- Node.js 20+
- MySQL 8.0+
- Docker (opcional)

### 2. Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd acessocatolico

# Instale as dependências
npm install
# Configure as variáveis de ambiente
cp .env.example .env

# Edite o arquivo .env com suas configurações
nano .env
```

### 3. Configuração do Banco de Dados

#### Opção A: Docker (Recomendado)

```bash
# Suba os containers (MySQL + phpMyAdmin + App)
npm run docker:up

# Rode as migrações
npm run db:migrate

# Execute o seed para dados iniciais
npm run db:seed
```

#### Opção B: MySQL Local

```bash
# Certifique-se que o MySQL está rodando
# Configure a DATABASE_URL no arquivo .env

# Rode as migrações
npm run db:migrate

# Execute o seed para dados iniciais
npm run db:seed
```

### 4. Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Ou com Docker
npm run docker:up
```

A aplicação estará disponível em:
- **App**: http://localhost:3000
- **phpMyAdmin**: http://localhost:8080 (se usando Docker)
- **Prisma Studio**: Execute `npm run db:studio`

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                 # Inicia servidor de desenvolvimento
npm run build              # Build para produção
npm run preview            # Preview do build de produção

# Banco de Dados
npm run db:generate        # Gera cliente Prisma
npm run db:migrate         # Executa migrações
npm run db:push            # Push schema para DB
npm run db:seed            # Popula banco com dados iniciais
npm run db:studio          # Abre Prisma Studio
npm run db:reset           # Reset completo do banco

# Qualidade de Código
npm run lint               # Executa ESLint
npm run lint:fix           # Corrige problemas do ESLint
npm run format             # Formata código com Prettier
npm run format:check       # Verifica formatação
npm run type-check         # Verifica tipos TypeScript

# Docker
npm run docker:up          # Sobe containers
npm run docker:down        # Para containers
npm run docker:logs        # Visualiza logs da aplicação
```

## 🗃️ Estrutura do Banco

O schema do Prisma inclui:

- **Usuários e Autenticação**: Users, UserProfiles, Roles
- **Localização**: States, Cities
- **Paróquias**: Dioceses, Parishes, ParishPriests, Masses
- **Eventos**: Events, EventRegistrations, EventProducts
- **Ministérios**: Ministries, MinistryMembers, MinistrySchedules
- **Agendamentos**: Appointments

## 🔐 Credenciais de Teste

Após executar o seed, use:

- **Admin**: admin@acessocatolico.com / admin123
- **Padre**: padre@exemplo.com / padre123

## 📚 Documentação

- [Roadmap do Projeto](./docs/md/roadmap.md)
- [Documento de Requisitos](./docs/md/ideal.md)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Nuxt 3 Documentation](https://nuxt.com/docs)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
