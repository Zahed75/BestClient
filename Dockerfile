# Install dependencies only when needed
FROM node:20-alpine

RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY ./ ./


RUN npm install --legacy-peer-deps

ARG NODE_ENV
ARG NEXT_PUBLIC_API_ENDPOINT


ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_API_ENDPOINT=${NEXT_PUBLIC_API_ENDPOINT}


RUN npm run build

EXPOSE 7800

CMD ["npm", "start"]














