const express = require('express');
const app = express();
const PORT = 4000;
const graphqlHTTP = require('express-graphql');
const ArticleSchema = require('./schemas/article');

app.use('/graphql', graphqlHTTP({
    schema: ArticleSchema,
    graphiql: true
}));

app.listen(PORT, function() {
    console.log(`Listening at port ${PORT}`);
})