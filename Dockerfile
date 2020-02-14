FROM node:lts-alpine as builder

# Uncomment and add your build deps here
# RUN apk add --no-cache \
# 	make

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY .npmrc .
RUN npm ci

ARG REACT_APP_ENV="development"
COPY . .
RUN npm run build:$REACT_APP_ENV


FROM nginx:1.17-alpine
COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
