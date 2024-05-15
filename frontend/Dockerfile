

FROM node:21-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#EXPOSE MEAN THAT THE PORT 3001 WILL BE EXPOSED TO THE OUTSIDE WORLD
EXPOSE 5173

CMD npm run dev










