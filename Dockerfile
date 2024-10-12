FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

# Only use this
RUN npm install

#COPY . .

#EXPOSE 3000
RUN ls -alh
CMD [ "node", "index.js" ]
