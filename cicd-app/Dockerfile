FROM node:20-alpine AS base

WORKDIR /cicd

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

RUN npm prune --omit=dev

FROM node:20-alpine

WORKDIR /cicd

COPY --from=base /cicd/node_modules ./node_modules
COPY --from=base /cicd/dist ./dist
COPY --from=base /cicd/prisma ./prisma
COPY --from=base /cicd/package.json ./package.json

# Starting our application
CMD ["node", "dist/main.js"]

# docker run --name cicd-project-postgres -e POSTGRES_DB=cicd-project -e POSTGRES_USER=cicd -e POSTGRES_PASSWORD=cicd -p 5432:5432 -d postgres