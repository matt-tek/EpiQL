const express = require('express')
var { graphqlHTTP } = require('express-graphql');
const { connectToDb, getDb } = require('./src/db/db')
const app = express();
const schema = require('./src/schema/schema')
let db;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))
// if no error at the db connection then we start the app
connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });        
        db = getDb();
    }
})


app.get('/', (req, res) => {
    res.status(200).json("app is running");
})

app.get('/home', (req, res) => {
    res.status(200).json("hello world");
})