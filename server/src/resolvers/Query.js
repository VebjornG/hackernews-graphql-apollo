//const { createContext } = require("react");

//import { PrismaClient } from '@prisma/client'
//const prisma = new PrismaClient()


function feed(parent, args, content, info) {
    return context.prisma.link.findMany()
}

module.exports = {
    feed,
}