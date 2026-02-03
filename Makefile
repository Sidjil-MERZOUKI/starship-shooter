# Makefile for Starship Game Project

.PHONY: install build dev clean run audit help

# Install dependencies
install:
	npm install

# Build the project
build:
	npm run build

# Start development server
dev:
	npm run dev-server

# Clean generated files
clean:
	rm -rf dist/
	rm -rf node_modules/

# Build and open in browser (Linux)
run: build
	xdg-open dist/index.html 2>/dev/null || open dist/index.html 2>/dev/null || start dist/index.html

# Check and fix security vulnerabilities
audit:
	npm audit fix

# Display help
help:
	@echo "Available commands:"
	@echo "  make install  - Install project dependencies"
	@echo "  make build    - Build the project"
	@echo "  make dev      - Start development server"
	@echo "  make run      - Build and open in browser"
	@echo "  make audit    - Fix security vulnerabilities"
	@echo "  make clean    - Remove generated files"
	@echo "  make help     - Show this help message"