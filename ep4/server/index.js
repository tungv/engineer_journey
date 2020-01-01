// index.js
const { ApolloServer } = require("apollo-server-micro");
const cors = require("micro-cors")();

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const handler = apolloServer.createHandler();
module.exports = cors((req, res) => {
  if (req.method === "POST" || req.method === "GET") {
    return handler(req, res);
  }

  return {};
});
