
import { PrismaClient } from "@prisma/client"

const prisma=new PrismaClient()

export default async function handler(req, res) {

    if (req.method==="POST"){
        const random=req.body.random
        const tokenId=req.body.tokenId

        const check=await prisma.Random.findMany({
            where : {
                tokenId : tokenId
            }
        })
        
        if(check==""){
            await prisma.Random.create({
                data: {
                    random : random,
                    tokenId:tokenId
                }
            });
            res.json({
                ok: true,
                random
            });
        }


        else {
            await prisma.Random.update({
                where : {
                    tokenId: tokenId
                },
                
                data: {
                  random: random
                },
              });
              res.json({
                ok: true  
            });

        } 
    }


    if (req.method==="GET"){
        const random=req.query.randomId
        const tokenId=await prisma.Random.findMany({
            where : {
                random : random
            }
        })
        res.json({
            tokenId,
        });

    }
}