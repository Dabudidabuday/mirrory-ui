FROM node:18-alpine

WORKDIR /mirrory-ui

ENV PATH /mirrory-ui/node_modules/.bin:$PATH

COPY package.json .

RUN npm install --silent

COPY . .

RUN npm run build

# EXPOSE 3000

CMD ["node", "run", "dev"]

FROM nginx:alpine

COPY --from=build /mirrory=ui/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]




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

