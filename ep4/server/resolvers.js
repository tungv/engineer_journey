const db = require("./db");
module.exports = {
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
