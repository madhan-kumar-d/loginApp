FROM node:20-alpine

# working dir
WORKDIR /app

# copy package and package lock json 
COPY package*.json ./

# Install all dependencies
RUN yarn install 
# RUN yarn install --production --ignore-engines
RUN yarn prisma generate

# Copy all files
COPY . .

# Expose port 
EXPOSE 8080

# defined env 
ENV DATABASE_URL="mysql://root:gquaaCPma8@host.docker.internal:3307/loginapp"
ENV JWT_SECRET="EBMBvv6BDYyOW8m"
ENV JWT_SECRET_REFRESH="LDvRJM7eElwLv8k"
ENV PORT="8080"
ENV HASHSALTROUND="LDvRJM7eElwLv8k"

# Command to run Prisma migrate, seed only if not seeded before, and then start the application
CMD ["sh", "-c", "yarn run migrate && if [ ! -f /app/seeds ]; then node ./dist/prisma/seed.js && touch /app/seeds; fi && yarn run build && node ./dist/src/index.js"]
