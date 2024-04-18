FROM node:18-alpine

WORKDIR /mirrory-ui

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]




# FROM node:18 as build

# WORKDIR /app
# RUN npm install
# RUN npm run build

# #production
# FROM nginx:stable-alpine
# COPY --from=build /app/build /usr/share/nginx/html/
# COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# EXPOSE 3001
# CMD [ "nginx", "-g", "daemon off;" ]

