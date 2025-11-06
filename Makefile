SHELL := /bin/sh
COMPOSE := docker compose
SERVICE := fumadocs

.PHONY: build up start dev down restart install logs clean openapi

build:
	$(COMPOSE) build

up:
	$(COMPOSE) up -d

start: up
	$(COMPOSE) exec $(SERVICE) pnpm dev --hostname 0.0.0.0

dev: start

openapi:
	$(COMPOSE) run --rm $(SERVICE) bun ./scripts/generate-docs.ts

down:
	$(COMPOSE) down

restart:
	$(COMPOSE) restart $(SERVICE)

install:
	$(COMPOSE) run --rm $(SERVICE) pnpm install

logs:
	$(COMPOSE) logs -f $(SERVICE)

clean:
	$(COMPOSE) down -v
