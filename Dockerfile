FROM nginx:1.17.3-alpine

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && mkdir -p /webpack-web

WORKDIR /webpack-web

ADD /dist/  /usr/share/nginx/html/

ENV env "test"

CMD sed -i "s/empEnv.active/\"${env}\"/g" /usr/share/nginx/html/config.js && nginx -g 'daemon off;'

