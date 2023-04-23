FROM node:19.8.1-slim@sha256:b3a668a854fb5bde0d6bedb9ac43a292e021789bbbc8d23db69e77b09b2b7c07 AS node-environment

FROM node-environment AS app-dependencies
WORKDIR /deps
COPY package.json .
COPY yarn.lock .

RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install --frozen-lockfile

FROM node-environment AS app
WORKDIR /app
COPY --from=app-dependencies /deps/node_modules ./node_modules
COPY index.html .
COPY tsconfig.json .
COPY vite.config.ts .
COPY public ./public
COPY src ./src
COPY package.json .
RUN yarn build

FROM nginx:1.24.0-alpine-slim@sha256:1fc79d650e6aa16683ab887298874842f46e6c3738b01d8d82fc88053eda1905 AS server
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=app --chown=root:root /app/dist /usr/share/nginx/html
