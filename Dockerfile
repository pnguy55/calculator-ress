# base image
FROM node:12.9.1 as react-build

# set working directory
WORKDIR /calculator-ress

# add `/app/node_modules/.bin` to $PATH
ENV PATH /calculator-ress/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . ./
RUN npm install --silent
RUN npm i -g react-scripts --silent
RUN npm run build
# start app
CMD ["npm", "start"]