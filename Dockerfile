# Stage 1: Build the application
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Serve the static files with BusyBox
FROM busybox:latest

# Create a non-root user
RUN addgroup -g 1001 sveltekit && \
    adduser -D -u 1001 -G sveltekit sveltekit

# Create directory for static files
RUN mkdir -p /home/sveltekit/www && \
    chown -R sveltekit:sveltekit /home/sveltekit

# Copy built files from builder stage
COPY --from=builder --chown=sveltekit:sveltekit /app/build /home/sveltekit/www

# Switch to non-root user
USER sveltekit

# Set working directory
WORKDIR /home/sveltekit/www

# Expose port
EXPOSE 8080

# Start BusyBox httpd server
CMD ["httpd", "-f", "-v", "-p", "8080", "-h", "/home/sveltekit/www"]
