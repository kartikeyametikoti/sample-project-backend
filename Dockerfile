# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 5000

#  CMD ["node", "index.js"]
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install express dotenv

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
