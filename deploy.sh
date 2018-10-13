docker build -t johnhigginsavila/web-app:latest -t johnhigginsavila/web-app:$SHA -f ./Dockerfile .
docker push johnhigginsavila/web-app:latest
docker push johnhigginsavila/web-app:$SHA