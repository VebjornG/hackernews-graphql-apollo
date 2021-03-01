//import { ApolloServer, gql } from 'apollo-server'
const { ApolloServer, gql } = require('apollo-server');
//import { typeDefs } from 'schema.graphql'
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')


/*let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
}]

let idCount = links.length*/

//The resolvers object is the actual implementation of the GraphQL schema.
/*const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => async (parent, args, context) => {
            return context.prisma.link.findMany()
        },
    },

    Mutation: {
        post: (parent, args, context, info) => {
            const newLink = context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description,
                },
            })
            return newLink
        }
    },

    Link: {
        id: parent => parent.id,
        description: parent => parent.description,
        url: parent => parent.url,
    }
}*/

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link
  }

//Finally, the schema and resolvers are bundled and passed to ApolloServer which is imported from apollo-server. 
//This tells the server what API operations are accepted and how they should be resolved.

const fs = require('fs')
const path = require('path')
const { getUserId } = require('./utils');
const { PubSub } = require('apollo-server')

const pubsub = new PubSub()

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'), 
        'utf8'
    ),
    //typeDefs,
    resolvers,

    // creating the context as a function which returns the context.
    // Advantage of begin able to attach the HTTP request that carries 
    // the incoming GraphQL query (or mutation) to the context as well.
    // This will allow the resolvers to read the Authorization header 
    // and validate if the user who submitted the request is eligible 
    // to perform the requested operation
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            pubsub,
            userId: 
                req && req.headers.authorization 
                    ? getUserId(req) 
                    : null
        }
    }
})

server.listen().then(({ url }) => 
    console.log(`
                🚀 Server is running...
                Listening on port 4000 at ${url}
                `)
);


