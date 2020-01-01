const { newPost, registerUser } = require("./helpers");
const withExecute = require("./withExecute");

describe("new comment", () => {
  it("should return comment", () => {
    return withExecute(async execute => {
      const authorId = await registerUser(execute, "tung");
      const commenterId = await registerUser(execute, "friend");
      const postId = await newPost(
        execute,
        authorId,
        "this is my first post!!!",
      );

      const { errors, data } = await execute(
        /* GraphQL */ `
          mutation($commenter: ID!, $content: String!, $post: ID!) {
            addComment(author: $commenter, content: $content, post: $post) {
              id
              content
              post {
                content
                author {
                  name
                }
              }
            }
          }
        `,
        { commenter: commenterId, content: "awesome!", post: postId },
      );

      expect(errors).toBeUndefined();

      expect(data.addComment).toEqual({
        id: expect.any(String),
        content: "awesome!",
        post: {
          content: "this is my first post!!!",
          author: { name: "tung" },
        },
      });
    });
  });
});
