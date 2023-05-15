FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN sh -c "sha256sum package-lock.json > package-lock.sha"

COPY package-lock.sha .

RUN npm install

COPY . .

CMD [ "npm", "start" ]
