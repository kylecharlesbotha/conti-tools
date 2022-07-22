ARG DOCKER_REGISTRY
ARG NODE_VERSION=16
ARG NPM_VERSION=8

FROM node:${NODE_VERSION}-alpine AS development

RUN apk --no-cache add curl \
  && npm i -g npm@${NPM_VERSION} \
  && npm install -g serve

# Periodically check that the server is alive and healthly
HEALTHCHECK --interval=30s --timeout=30s --start-period=10s --retries=10 \
    CMD node ./healthcheck.js

# Assert that our apps working directory exists and that we own it
RUN mkdir -p /app \
    && chown node -R /app
WORKDIR /app

USER node

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node ./package*.json ./
COPY --chown=node:node ./.npmrc ./

RUN npm ci --quiet

# Copy in app contents
COPY --chown=node:node . .

RUN npm run build

CMD ["serve", "-l", "3000", "-s", "build"]

# Configure TEST runner, which will run tests as a build validation step

FROM node:${NODE_VERSION}-alpine AS tester

ENV NODE_ENV=ci
ENV CI=true

RUN mkdir -p /app
WORKDIR /app

USER node

COPY --chown=node:node --from=development /app /app

# Run Tests
RUN npm run lint && npm run test:ci
# Audit Packages
# Changed this after react-scripts introduced unfixable dependencies and was moved to be a dev dependencies
RUN npm audit --production --audit-level=high

CMD ["npm", "start"]

# Configure PRODUCTION image, with lean dependencies and compiled JS.

FROM node:${NODE_VERSION}-alpine AS production

RUN npm i -g npm@${NPM_VERSION}

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN mkdir -p /app/build && chown -R node /app
WORKDIR /app

USER root

RUN npm install -g serve

USER node

COPY --chown=node:node --from=development /app/build /app/build

EXPOSE 3000
CMD ["serve", "-l", "3000", "-s", "build"]
