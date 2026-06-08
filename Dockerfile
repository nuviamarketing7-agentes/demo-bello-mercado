FROM node:20-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the frontend
RUN npm run build

# Expose port 3000 explicitly
EXPOSE 3000

# Set production env and ensure the PORT is strictly 3000
ENV NODE_ENV=production
ENV PORT=3000

# Start the server
CMD ["node", "server.js"]
# Force rebuild 1
