const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList } = graphql
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
                // console.log("parent = ", parent)
                // data = {}
                // author.forEach((e) => {
                //     if (e.id == parent.authorId) {
                //         data = e
                //     }
                // })
                // return data
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
                    // data = []
                    // books.forEach((e) => {
                    //     if (e.authorId == parent.id)
                    //         data.push(e)
                    // })
                    // return data
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
                // data = {}
                // books.forEach((e) => {
                //     if (e.id == args.id) {
                //         data = e
                //     }
                // })
                // return data;
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID }},
            resolve(parent, args){
                // data = {}
                // author.forEach((e) => {
                //     if (e.id == args.id) {
                //         data = e
                //     }
                // })
                // return data;
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return author
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
                name: {type: GraphQLString}
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
                name: {type: GraphQLString},
                authorId: { type: GraphQLID  },
                genre: { type: GraphQLString }
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