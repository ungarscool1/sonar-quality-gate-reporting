FROM node:16.9.0 AS build

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM node:16.9.0-alpine

LABEL version="1.1.0" \
    repository="https://github.com/ungarscool1/sonar-quality-gate-reporting" \
    homepage="https://github.com/ungarscool1/sonar-quality-gate-reporting" \
    maintainer="ungarscool1" \
    com.github.actions.name="Community SonarQube Quality Gate Reporting" \
    com.github.actions.description="Fetch SonarQube Quality Gate status for a project" \
    com.github.actions.icon="check" \
    com.github.actions.color="green"

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY --from=build /app/build .
RUN yarn install --prod

CMD ["node", "/app/index.js"]