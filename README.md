
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```



### DB ON 
cd /usr/local/mysql/bin
./mysql -u root -p

### prisma
npx prisma migrate dev --name create_categories
npx prisma generate
npx prisma studio

### DB  
DATABASE_URL="mysql://root:[password]@localhost:3306/[db_name]]"

### start
#npm run dev

0x2d80B7111951fFEd8b6bc59BE56913B36303A203