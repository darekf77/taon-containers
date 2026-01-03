FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

EXPOSE 80

ENV NODE_ENV=production
ENV PORT=80

# Angular 21 SSR engine
CMD ["node", "server/server.mjs"]
