.PHONY: all build clean run

all: run

build:
	docker build -t homedb -f Deployment/Dockerfile .

clean:
	@rm -rf node_modules
	@echo Cleaned

down:
	docker-compose -f Deployment/docker-compose.yml down

run:
	docker-compose -f Deployment/docker-compose.yml up
