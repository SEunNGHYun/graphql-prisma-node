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
        feed : () => links
    },
    Mutation : {
        post : (parent, args) => {
            const link = {
                id : `link- ${idCount++}`,
                description : args.description,
                url : args.url
            }
            links.push(link);
            return link;
        }
    }
}

const server = new GraphQLServer({typeDefs :'./src/schemas.graphql', resolvers});

server.start(() => console.log("Server is running on localhost:4000"));