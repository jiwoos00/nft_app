
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
