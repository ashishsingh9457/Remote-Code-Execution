# Use the official Ubuntu image as the base image
FROM ubuntu:latest

# Update the package list and install required packages
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    python3 \
    python3-pip \
    nodejs \
    npm \
    openjdk-11-jdk \
    curl

# Create app directory
WORKDIR /usr/src/remote-code-execution

# Copy the current directory contents into the container at /usr/src/remote-code-execution
COPY . .

# Install app dependencies
RUN cd Server && npm install

# Expose the port the app runs on
EXPOSE 3000

# Set up default command to run the server
CMD ["node", "Server/app.js"]
