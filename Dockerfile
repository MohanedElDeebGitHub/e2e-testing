# Use the official Cypress included image which comes with Node.js and browsers pre-installed
# You can pin this to your specific Cypress version, e.g., cypress/included:13.6.0
FROM cypress/included:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the workspace files
COPY . .

# Set the default command to execute the tests headlessly
CMD ["npx", "cypress", "run"]