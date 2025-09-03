# Comando padrão
all: deploy

# Atualiza o repositório
update:
	@echo " [+] Atualizando Projeto"
	git pull

# Instala as dependências e garante que "humps" esteja presente
install:
	@echo " [-] Instalando dependências"
	npm install
	@echo " [+] Instalando dependências"


# Build da aplicação
build:
	@echo " [+] Buildando a aplicação"
	npm run build

# Inicia ou reinicia o app no PM2
start:
	pm2 start ecosystem.config.cjs --env production

restart:
	@echo " [+] Reiniciando o servidor"
	pm2 restart ecosystem.config.cjs --env production

# Para o app
stop:
	pm2 stop $(APP_NAME)

# Logs
logs:
	pm2 logs $(APP_NAME)

# Status no PM2
status:
	@echo " [+] Deploy Finalizado!"
	pm2 status $(APP_NAME)

# Limpeza de cache do Nuxt e node_modules (se precisar forçar rebuild)
clean:
	rm -rf node_modules .output .nuxt package-lock.json
	npm cache clean --force

# Deploy completo
deploy: update install build restart status