help:
	grep "^[a-zA-Z\-]*:" Makefile | grep -v "grep" | sed -e 's/^/make /' | sed -e 's/://'

front:
	cd frontend && npm run dev

build:
	cd backend && ./gradlew build

up:
	docker compose -f backend/docker-compose.dev.yml --env-file backend/.env.dev up --build

build-up:
	make build
	make up

down:
	docker compose -f backend/docker-compose.dev.yml down

# コンテナ内に入る
exec:
	docker compose -f backend/docker-compose.dev.yml exec app sh

# postgreSQL操作
psql:
	docker compose -f backend/docker-compose.dev.yml exec db psql -U root -d todo_app
