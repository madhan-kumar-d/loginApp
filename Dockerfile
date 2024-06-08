FROM node:20-alpine

# working dir
WORKDIR /app

# copy package and package lock json 
COPY package*.json .

# Install all dependencies
RUN yarn install 
# RUN yarn install --production --ignore-engines
RUN yarn prisma generate

# Copy all files
COPY . .

# Expose port 
EXPOSE 3080

# defined env 
# ENV DATABASE_URL="mysql://root:gquaaCPma8@db:3306/loginapp"
# ENV JWT_SECRET="EBMBvv6BDYyOW8m"
# ENV JWT_SECRET_REFRESH="LDvRJM7eElwLv8k"
# ENV PORT="8080"
# ENV HASHSALTROUND="5"

# Command to run Prisma migrate, seed only if not seeded before, and then start the application
CMD ["sh", "-c", "yarn run postinstall && yarn run migrate && yarn run build && if [ ! -f /seeded ]; then node ./build/prisma/seed.js && touch /seeded; fi && node ./build/src/index.js"]
