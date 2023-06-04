.PHONY: *

build:
	docker buildx build . --target=server --tag=ghcr.io/covik/fms-frontend:latest --progress plain

push:
	docker push ghcr.io/covik/fms-frontend:latest
