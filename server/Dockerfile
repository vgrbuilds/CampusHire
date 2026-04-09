# We specify Node version 24 using the lightweight alpine distribution
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the dependency manifests
COPY package*.json ./

# Install only production dependencies (ignoring devDependencies)
RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Ensure uploads directory structure exists (though K8s will mount over it)
RUN mkdir -p uploads

# Expose the API port
EXPOSE 8000

# Command to boot the server
CMD ["npm", "start"]
