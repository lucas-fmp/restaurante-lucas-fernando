.PHONY: down up restart

down:
	docker-compose down -v

up:
	docker-compose up

restart: down
	docker-compose build
	docker-compose up