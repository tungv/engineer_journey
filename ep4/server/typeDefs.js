const { gql } = require("apollo-server-micro");

module.exports = gql`
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
