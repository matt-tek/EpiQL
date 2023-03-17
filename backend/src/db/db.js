const express = require ('express');
const { MongoClient } = require ('mongodb');
let dbConnection;

// connection to database is established here
module.exports = {
    // connection to database with this link because the db is on my computer
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://127.0.0.1:27017/bookstore')
        .then((client) => {
            dbConnection = client.db();
            return cb();
        })
        .catch((err) => {
            console.log(err);
            return cb(err);
        })
    },
    getDb: () => dbConnection
}