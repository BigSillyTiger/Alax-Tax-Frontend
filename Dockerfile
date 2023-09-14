FROM node:18.16.0-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./src ./src
COPY index.html ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY tsconfig.paths.json ./
COPY vite.config.ts ./
COPY .eslintrc.cjs ./
CMD npm start