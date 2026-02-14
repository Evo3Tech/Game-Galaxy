FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY app.js db.js user_controller.js user_router.js user.js ./
COPY src ./src

COPY --from=build /app/dist ./dist

EXPOSE 1231

CMD ["npm", "run", "server"]