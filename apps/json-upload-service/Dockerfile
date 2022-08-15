FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/json-upload-service .
ENV PORT=4100
EXPOSE ${PORT}
RUN yarn install --production
# dependencies that express needs
CMD node ./main.js
ENV MONGODB_URI=mongodb+srv://jsonserve_user:Pfe08eQcADXRuN7e@jsonservecluster.a08t5is.mongodb.net/?retryWrites=true&w=majority
ENV MONGODB_NAME=shop
ENV APOLLO_UPLOAD_JSON_SERVICE_PORT=4100
