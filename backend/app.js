const express = require('express')
const { connectToDb, getDb } = require('./src/db/db')
const app = express();

let db;

// if no error at the db connection then we start the app
connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });        
        db = getDb();
    }
})

app.get('/home', (req, res) => {
    res.status(200).json("hello world");
})