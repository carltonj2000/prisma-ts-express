# Prisma Typescript And Express

The code in this repository is based on the
[Build a Backend with Prisma in a TypeScript Node Project](https://egghead.io/courses/build-a-backend-with-prisma-in-a-typescript-node-project-ca6628d3)
course.

The setup for the postgres docker container is documented at
https://github.com/carltonj2000/machine-setups

```bash
npm i -D typescript ts-node-dev @types/node @types/express
npm i express
#  create tsconfig.json and server.js
npm i -D prisma
npm i @prisma/client
npx prisma init
# edit ./prisma/schema.prisma
npx prisma migrate dev # "init" on first run, then table name added
npx prisma studio
```
