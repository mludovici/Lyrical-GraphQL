const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

// Replace with your mongoLab URI
//const MONGO_URI = 'mongodb://MALMAL:IsgiInet123!@ds221631.mlab.com:21631/dnz';
//const MONGO_URI = 'mongodb://localhost:27017/test';
const MONGO_URI = 'mongodb://stephen:stephen@ds021182.mlab.com:21182/lyricaldb';


if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://marc:marc@cluster0-wjof5.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {useMongoClient: true});
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
