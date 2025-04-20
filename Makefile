build:
	cd backend && ./gradlew build

up:
	docker compose up --build

build-up:
	make build
	make up

down:
	docker compose down

# コンテナ内に入る
exec:
	docker compose exec app sh
