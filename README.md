<h2> Klaytn NFT BAPP </h2>
<b>2022.03</b>

![nft-intro](public/main.gif)

## Table of contents
- [1) Introduction](#1-introduction)
- [2) Features](#2-features)
- [3) Getting started](#3-getting-started)


### 1) Introduction
Contract Addr : ```0x30c947e45fd6cd4c8de76a9f15b5f8c8ebcb45c1```
> [Scope](https://baobab.klaytnfinder.io/account/0x30c947e45fd6cd4c8de76a9f15b5f8c8ebcb45c1)

<br/>


### 2) Features
- Klaytn & Kaikas
- [Caver.js](https://docs.klaytn.foundation/ko/) 
- [IPFS](https://www.npmjs.com/package/ipfs-http-client)
- Primsa & MySQL

- Truffle & Solidity

<br/>

### 3) Getting started

```bash
git clone 'https://github.com/jiwoos00/nft_app.git'
echo 'DATABASE_URL="mysql://root:[password]@localhost:3306/[db_name]' > .env
npm install 
npx prisma migrate dev --name create_categories
npx prisma generate
npx prisma studio
ipfs daemon
npm run dev
```
