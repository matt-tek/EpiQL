const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } = graphql
const Book = require('../db/book');
const Author = require('../db/author');

const BookType = new GraphQLObjectType({
    name: 'Books',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorId)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
                resolve(parent, args) {
                 return Book.find({ authorId: parent.id })
            }
        }
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
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID }},
            resolve(parent, args){
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({})
            }
        }
    })
})

// add data in the database
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name
                })
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) },
                genre: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    authorId: args.authorId,
                    genre: args.genre
                })
                return book.save()
            }
        }
    },
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});