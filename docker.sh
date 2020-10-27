yarn build
docker build -t registry.cn-shanghai.aliyuncs.com/hfrost/dingding:1.2 .
docker push registry.cn-shanghai.aliyuncs.com/hfrost/dingding:1.2

# 服务器
docker stop dingding
docker rm dingding
docker pull registry.cn-shanghai.aliyuncs.com/hfrost/dingding:1.2
docker run -d -p 8003:80 --name dingding registry.cn-shanghai.aliyuncs.com/hfrost/dingding:1.2