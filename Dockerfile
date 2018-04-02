FROM node:latest

LABEL MAINTAINER andanhm3@gmail.com

# WORKDIR src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
ADD src .
COPY src .

RUN npm install --only=production

EXPOSE 80
CMD [ "npm", "start" ]
