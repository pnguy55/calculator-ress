# # base image
# FROM node:12.9.1 as react-build

# # set working directory
# WORKDIR /calculator-ress

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /calculator-ress/node_modules/.bin:$PATH

# # Copy the current directory contents into the container at /app
# ADD . /calculator-ress
# RUN npm install --silent
# RUN npm i -g react-scripts --silent
# RUN npm run build

# EXPOSE 80
# ENV NAME World
# # start app
# CMD ["npm", "start"]

FROM nginx:1.17
COPY build/ /usr/share/nginx/html
EXPOSE 80