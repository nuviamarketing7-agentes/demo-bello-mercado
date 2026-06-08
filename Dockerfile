FROM node:20-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the frontend
RUN npm run build

# Expose port 80 explicitly
EXPOSE 80

# Set production env and ensure the PORT is strictly 80
ENV NODE_ENV=production
ENV PORT=80

# Start the server
CMD ["node", "server.js"]
# Force rebuild 1
