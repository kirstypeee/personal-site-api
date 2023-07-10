# Build dependencies
FROM node:20-alpine as dependencies
RUN npm i
# Build production image
FROM dependencies as builder
RUN npm run build
EXPOSE 3000
CMD npm run start
