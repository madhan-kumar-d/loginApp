FROM node:20-alpine

# working dir
WORKDIR /

# copy package and package lock json 
COPY package*.json ./

# Install all dependencies
RUN yarn install
RUN yarn prisma generate

# Copy all files
COPY . .

# Expose port 
EXPOSE 8080

# defined env 
ENV DATABASE_URL="mysql://root:gquaaCPma8@localhost:3306/loginapp"
ENV JWT_SECRET="EBMBvv6BDYyOW8m"
ENV JWT_SECRET_REFRESH="LDvRJM7eElwLv8k"
ENV PORT="8080"
ENV HASHSALTROUND="LDvRJM7eElwLv8k"

# Command to run Prisma migrate, seed only if not seeded before, and then start the application
CMD ["sh", "-c", "npx prisma migrate deploy && if [ ! -f /app/seeded ]; then npm run seed && touch /app/seeded; fi && npm start"]
