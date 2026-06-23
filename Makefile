.PHONY: dev dev-client dev-server build lint install clean help

help:
	@echo "📋 Available commands:"
	@echo "  make dev          - Run both client and server in parallel"
	@echo "  make dev-client   - Run Vite dev server only (port 5173)"
	@echo "  make dev-server   - Run Express server only (port 3001)"
	@echo "  make build        - Build for production"
	@echo "  make lint         - Run ESLint"
	@echo "  make install      - Install dependencies"
	@echo "  make clean        - Remove node_modules and build artifacts"

install:
	npm install

dev:
	npm run dev & npm run server & wait

dev-client:
	npm run dev

dev-server:
	npm run server

build:
	npm run build

lint:
	npm run lint

preview:
	npm run preview

clean:
	rm -rf node_modules dist .vite

.DEFAULT_GOAL := help
