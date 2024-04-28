FROM node:alpine AS build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "build"]

FROM nginx:1.21.1-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html