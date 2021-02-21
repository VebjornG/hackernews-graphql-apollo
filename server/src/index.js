//import { ApolloServer, gql } from 'apollo-server'

const { ApolloServer, gql } = require('apollo-server');
//import { typeDefs } from 'schema.graphql'




let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
}]

//The resolvers object is the actual implementation of the GraphQL schema.

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },

    Link: {
        id: parent => parent.id,
        description: parent => parent.description,
        url: parent => parent.url,
    }
}

//Finally, the schema and resolvers are bundled and passed to ApolloServer which is imported from apollo-server. 
//This tells the server what API operations are accepted and how they should be resolved.

const fs = require('fs')
const path = require('path')

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'), 
        'utf8'
    ),
    //typeDefs,
    resolvers,
})

server.listen().then(({ url }) => 
    console.log(`
                🚀 Server is running...
                Listening on port 4000 at ${url}
                `)
);


