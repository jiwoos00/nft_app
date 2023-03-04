# Klaytn BAPP - NFT

## Table of contents
- [1) Introduction](#1-introduction)
- [2) Getting started](#2-getting-started)


### 1) Introduction
Contract Addr : 0x9E2a996613B878EcaE19f6825BcF6cee6c97Edd8

![nft-intro](public/1.gif)
![nft-intro](public/2.gif)

> [Scope](https://baobab.scope.klaytn.com/account/0x9E2a996613B878EcaE19f6825BcF6cee6c97Edd8?tabId=txList)


### 2) Getting started
1. Open terminal
2. Clone the repo by running `https://github.com/jiwoos00/nft_app.git`
3. `cd nft_app`
4. Run `npm install` or `npm i` to install node packages
5. Creating a .env File
6. Write `DATABASE_URL="mysql://root:[password]@localhost:3306/[db_name]"` in .env
7. Start mysql
8. `npx prisma migrate dev --name create_categories`
9. `npx prisma generate`
10. `npx prisma studio`
11. Run `npm run dev`
12. App should be running https://localhost:[port], https://127.0.0.1:[port], https://0.0.0.0:[port]

