import { PrismaClient } from "@prisma/client"

const prisma=new PrismaClient()

export default async function handler(req, res) {
    
    if(req.method==="POST"){
        const user_addr=req.body.addr;
        const user = await prisma.User.findUnique({
            where: {
                addr : user_addr,
            },
        })
        if (user==null){
            await prisma.User.create({
                data: {
                    addr: user_addr
                }
            });
        }
        
        res.json({
            ok : true,
            user,
        });
    }

    if (req.method==="GET"){
        const user_addr=req.query.addr
        const user = await prisma.User.findUnique({
            where: {
                addr : user_addr,
            },
        })
        res.json({
            ok: true,
            ok2:user.name,
            ok3:user.auth
        });
    }
    
}