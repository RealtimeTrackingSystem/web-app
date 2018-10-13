docker build -t johnhigginsavila/web-app:latest -t johnhigginsavila/web-app:$SHA -f ./Dockerfile .
docker push johnhigginsavila/web-app:latest
docker push johnhigginsavila/web-app:$SHA
kubectl apply -f k8s
kubectl set image deployments/web-app-deployment web-app=johnhigginsavila/web-app:$SHA