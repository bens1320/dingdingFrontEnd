yarn build
docker build -t registry.cn-shanghai.aliyuncs.com/hfrost/dingding:1.6 .
docker push registry.cn-shanghai.aliyuncs.com/hfrost/dingding:1.6

# 服务器
docker stop dingding
docker rm dingding
docker pull registry.cn-shanghai.aliyuncs.com/hfrost/dingding:1.6
docker run -d -p 8003:80 --name dingding registry.cn-shanghai.aliyuncs.com/hfrost/dingding:1.6