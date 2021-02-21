import { ApolloServer, gql } from 'apollo-server'


//The typeDefs constant defines the GraphQL schema. 
//Here, it defines a simple Query type with one field called info. This field has the type String!. 
//The exclamation mark in the type definition means that this field is required and can never be null.

const typeDefs = gql`
    type Query {
        info: String!
    }
`;


//The resolvers object is the actual implementation of the GraphQL schema.

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`
    }
}

//Finally, the schema and resolvers are bundled and passed to ApolloServer which is imported from apollo-server. 
//This tells the server what API operations are accepted and how they should be resolved.

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen.then(({ url }) => 
    console.log(`
                🚀 Server is running...
                Listening on port 4000 at ${url}
                `)
);


