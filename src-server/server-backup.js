var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
   tata:String,
   grile: String,
   hello: String,
   }
`);

var ceva = [{
    tata: "ceva",
}]
// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return ceva;
    },
    grile: () => {
        return 'ba';
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');