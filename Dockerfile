FROM yewton/swagger-editor:latest

RUN npm install -g gulp

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

RUN chmod +x start.sh
RUN cp -f defaults.json /runtime/dist/config/ && cp swagger.yaml /runtime/dist/spec-files/

EXPOSE 3000
CMD ["/usr/src/app/start.sh"]
