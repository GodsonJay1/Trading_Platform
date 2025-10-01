# frontend/Dockerfile
# Stage 1: build the frontend
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm ci

# Copy all source files and build
COPY . .
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:alpine
# Copy build output (support both common outputs: dist or build)
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/build /usr/share/nginx/html

# Add custom nginx config (make sure frontend/nginx.conf exists)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
