# Base image (alpine is small and efficient)
FROM node:lts-alpine

# Add the working directory
WORKDIR /app

# Copy only package json for efficiency
COPY package.json .

# What to run when creating image
RUN npm install --omit-dev

# Copy everything else from project dir into /app
COPY . .

# Cmd to run when container starts
CMD ["npm", "start"]