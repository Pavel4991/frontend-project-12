lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/dist

start:
	make start-backend

develop:
	npm run dev --prefix frontend & npx start-server

build:
	rm -rf frontend/dist
	make install
	npm run build
