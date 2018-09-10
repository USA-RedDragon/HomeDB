FROM node:alpine

WORKDIR /app

EXPOSE 3000

RUN apk add mysql-client make gcc g++ python

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app
COPY Deployment/wait-for-mysql.sh /app
RUN chmod a+x wait-for-mysql.sh

CMD ["npm", "run", "dev"]