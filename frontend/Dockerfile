# Stage 1: Build frontend
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
COPY tailwind.config.js postcss.config.js vite.config.js ./
COPY public ./public
COPY src ./src

RUN npm install
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build output to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

