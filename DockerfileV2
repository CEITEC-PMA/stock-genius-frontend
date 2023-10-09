FROM node:alpine AS DEPS
WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN apk add --no-cache git \
    && npm ci \
    && rm -rf /root/.npm

FROM node:alpine AS BUILD_IMAGE
WORKDIR /usr/app
COPY --from=DEPS /usr/app/node_modules ./node_modules
COPY . .
RUN apk add --no-cache git curl \
    && npm run build \
    && rm -rf node_modules \
    && npm ci --omit=dev \
    && rm -rf /root/.npm

FROM node:alpine as CLEAN
ENV NODE_ENV production
WORKDIR /usr/app
COPY --from=BUILD_IMAGE /usr/app/package.json /usr/app/package-lock.json ./
COPY --from=BUILD_IMAGE /usr/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/app/public ./public
COPY --from=BUILD_IMAGE /usr/app/.next ./.next
COPY --from=BUILD_IMAGE /usr/app/next.config.js ./

FROM node:alpine as PRODUCTION
WORKDIR /usr/app
COPY --from=CLEAN /usr/app .
EXPOSE 3030

CMD ["npm", "start"]
