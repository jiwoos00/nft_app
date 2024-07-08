import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const user_addr = req.body.addr;
    const user = await prisma.User.findUnique({
      where: {
        addr: user_addr,
      },
    });

    if (user === null) {
      await prisma.User.create({
        data: {
          addr: user_addr,
        },
      });
    }
  }

  if (req.method === "GET") {
    const user_addr = req.query.addr;
    const user = await prisma.User.findUnique({
      where: {
        addr: user_addr,
      },
    });
    res.json({
      name: user.name,
      auth: user.auth,
    });
  }

  if (req.method === "PUT") {
    const username = req.body.username;
    const useraddr = req.body.useraddr;
    await prisma.User.update({
      where: {
        addr: useraddr,
      },
      data: {
        name: username,
      },
    });
    res.json({
      status: true,
    });
  }
}
