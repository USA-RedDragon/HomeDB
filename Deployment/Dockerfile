FROM node:alpine as builder

WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

EXPOSE 3000

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN npm run build


FROM nginx:1.13.9-alpine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]