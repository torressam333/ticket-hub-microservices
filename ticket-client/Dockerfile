# Grab base image
FROM node:lts-alpine

# Set up working directory
WORKDIR /app

# Copy into workdir
COPY package.json .

# Cmd to run
RUN npm install --omit-dev

#Copy everything else from src dir
COPY . .

# Default cmd to run when container is created from this image
CMD ["npm", "run", "dev"]