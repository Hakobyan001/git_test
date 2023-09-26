# Use an official Node.js runtime as the base image
FROM node:16.17.0

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

EXPOSE 2000
# Specify the command to run when the container starts
# Create shell script to run multiple commands
RUN echo "#!/bin/sh\nnpm run start" > /app/start.sh
#RUN echo "#!/bin/sh\nnpm run start" > /app/start.sh

RUN chmod 775 /app/start.sh

CMD ["/app/start.sh"]
