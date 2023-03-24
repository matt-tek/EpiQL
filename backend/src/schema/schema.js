const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql

var books = [
    { id: "0", name: "Harry Potter and the goblet of fire", author: "J.K Rowling", genre: "Fantasy"},
    { id: "1", name: "Moby Dick", author: "Herman Melville", genre: "adventure"},
    { id: "2", name: "the stranger",  author: "Albert Camus",  genre: "philosophical"}
]

const BookType = new GraphQLObjectType({
    name: 'Books',
    fields: () => ({
        id: { type: GraphQLID },
        author: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

// query data from database or other location

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        book: {
            type: BookType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                data = {}
                books.forEach((e) => {
                    if (e.id == args.id) {
                        data = e
                    }
                })
                return data;
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery
});