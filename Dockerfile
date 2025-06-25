FROM ghcr.io/nalbandyanmisha/devhunter-base:latest

COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Start the Express server
CMD ["npm", "run", "start:dev"]

# Expose port 5000
EXPOSE 3001
