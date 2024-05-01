FROM node:alpine AS build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "build"]

FROM nginx:latest

EXPOSE 8080

COPY --from=build /usr/src/app/dist /var/www/html