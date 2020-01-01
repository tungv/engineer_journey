const { ApolloServer, gql } = require("apollo-server-micro");
const db = require("./db");

const typeDefs = gql`
  type Query {
    user(id: ID!): User
  }

  type Mutation {
    register(name: String!): User!
    newPost(author: ID!, content: String!, taggedUsers: [ID!]): Post!
    addComment(author: ID!, post: ID!, content: String!): Comment!
  }

  type User {
    id: ID
    name: String!
    friends: [User]
    posts: [Post!]!
  }

  type Post {
    id: ID!
    content: String!
    author: User!
    comments: [Comment]
    taggedUsers: [User]
  }

  type Comment {
    id: ID!
    author: User!
    content: String!
    post: Post!
  }
`;

const resolvers = {
  Query: {
    async user(root, { id }) {
      return db.findUserById(id);
    },
  },
  Mutation: {
    async register(root, { name }) {
      return db.createUser({ name });
    },
    async newPost(root, { author, taggedUsers, content }) {
      return db.createPost({ createdBy: author, content, tagged: taggedUsers });
    },
    async addComment(root, { author, post, content }) {
      return db.createComment({ createdBy: author, content, postId: post });
    },
  },
  User: {
    async posts(user) {
      const posts = await db.findPosts(post => post.createdBy === user.id);
      // because JS!!!
      // Array#reverse() is mutative
      return [...posts].reverse();
    },
  },
  Post: {
    async taggedUsers(post) {
      return db.findAllUsersByIdArray(post.tagged);
    },
    async author(post) {
      return db.findUserById(post.createdBy);
    },
    async comments(post) {
      return db.findComments(comment => comment.postId === post.id);
    },
  },
  Comment: {
    async post(comment) {
      return db.findPostById(comment.postId);
    },
    async author(comment) {
      return db.findUserById(comment.createdBy);
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
module.exports = apolloServer.createHandler();
