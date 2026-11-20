FROM node:24-alpine AS build-env
WORKDIR /app
COPY . /app/
# 仓库不提交 pnpm-lock.yaml，这里不能用 --frozen-lockfile，否则干净构建直接失败
RUN corepack enable && pnpm install --no-frozen-lockfile && pnpm run build

FROM nginx:alpine
COPY --from=build-env /app/dist /usr/share/nginx/html
# SPA history fallback：深链接一律回退到 index.html
RUN printf 'server {\n  listen 3000;\n  server_name _;\n  root /usr/share/nginx/html;\n  index index.html;\n  location / {\n    try_files $uri $uri/ /index.html;\n  }\n}\n' > /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
