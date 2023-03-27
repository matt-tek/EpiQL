const express = require ('express');
const { MongoClient } = require ('mongodb');
const mongoose = require('mongoose')

// connection to database is established here
module.exports = {
    // connection to database with this link because the db is on my computer
    connectToDb: () => {
        mongoose.connect('mongodb://127.0.0.1:27017/gql')
        mongoose.connection.once('open', () => {
            console.log("connected to db")
        })
    },
}