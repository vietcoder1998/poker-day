FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx as production-stage
RUN ls
COPY --from=build-stage /app/dist /usr/share/nginx/html

# cp config to nginx 
COPY config/nginx/nginx.conf /etc/nginx/nginx.conf
# export nginx to port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
