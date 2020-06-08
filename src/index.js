import { GraphQLServer } from 'graphql-yoga'
import morgan from 'morgan';


let links = [{
    id : 'link-0',
    url :  'www.howtographql.com',
    description : 'Practice Graphql Server'
}];

let idCount = links.length;

const resolvers = {
    Query : {
        info : () => `GraphQl `,
        feed : () => (root, args, context, info) => {
            return context.prisma.links()
        }
    },
    Mutation : {
        post : (root, args, context) => {
            return context.prisma.createLink({
                url : args.url,
                description : args.description
            })
        }
    }
}

const server = new GraphQLServer({typeDefs :'./src/schemas.graphql', resolvers});

server.start(() => console.log("Server is running on localhost:4000"));