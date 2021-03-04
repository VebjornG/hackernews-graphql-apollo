//const { createContext } = require("react");

//import { PrismaClient } from '@prisma/client'
//const prisma = new PrismaClient()


async function feed(parent, args, content, info) {
    const where = args.filter
        ? {
            OR: [
                    { description: { contains: args.filter } },
                    { url: { contains: args.filter } },
            ],
        }
        : {}

    const links = await context.prisma.link.findMany({
        where,
    })

    return links
}

module.exports = {
    feed,
}