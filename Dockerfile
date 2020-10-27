FROM nginx
LABEL maintainer = "HuangHuiling <2498393441@qq.com>"
COPY dist /usr/share/nginx/html
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf

