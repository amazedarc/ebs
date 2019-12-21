/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable node/no-unsupported-features/es-syntax */
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const graphqlResolver = require('./graphql/res/index');
const graphqlSchema = require('./graphql/schema/index');

const app = express();
app.use(bodyParser.json());

app.use(
    '/graphql',
    graphqlHttp({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true
    })
);
const DB = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ng4ut.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose
    .connect(DB, {
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('DB connection granted');
    });
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening to port ${process.env.PORT}`);
});
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    app.close(() => {
        process.exit(1);
    });
});