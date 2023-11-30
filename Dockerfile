FROM node:20-slim
RUN apt-get update && apt-get install -y git
COPY . /usr/src/medplum
WORKDIR /usr/src/medplum
RUN npm ci
RUN npm run build
RUN chmod -R 777 /usr/src/medplum/packages/app/docker-entrypoint.sh
RUN chmod -R 777 /usr/src/medplum/packages/server/docker-entrypoint.sh
CMD ["bash"]
