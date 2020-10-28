yarn build
docker build -t registry.cn-shanghai.aliyuncs.com/hfrost/dingding:1.3 .
docker push registry.cn-shanghai.aliyuncs.com/hfrost/dingding:1.3

# 服务器
docker stop dingding
docker rm dingding
docker pull registry.cn-shanghai.aliyuncs.com/hfrost/dingding:1.3
docker run -d -p 8003:80 --name dingding registry.cn-shanghai.aliyuncs.com/hfrost/dingding:1.3