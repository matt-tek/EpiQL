const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList } = graphql
const Book = require('../db/book');
const Author = require('../db/author');

// var books = [
//     { id: "0", name: "Harry Potter and the goblet of fire", authorId: "0", genre: "Fantasy"},
//     { id: "1", name: "Moby Dick", authorId: "1", genre: "adventure"},
//     { id: "2", name: "the stranger",  authorId: "2",  genre: "philosophical"},
//     { id: "3", name: "the fall",  authorId: "2",  genre: "philosophical"},
//     { id: "4", name: "Harry Potter and the Chamber of secrets", authorId: "0", genre: "Fantasy"}
// ]

// var author = [
//     { id: "0", name: "J.K Rowling"},
//     { id: "1", name: "Herman Melville"},
//     { id: "2", name: "Albert Camus"}
// ]

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

module.exports = new GraphQLSchema({
    query: RootQuery
});