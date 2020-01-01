const { registerUser } = require("./helpers");
const withExecute = require("./withExecute");

describe("new post", () => {
  it("should return content and tagger friends", () => {
    return withExecute(async execute => {
      const authorId = await registerUser(execute, "tung");
      const friendId = await registerUser(execute, "friend");

      const { errors, data } = await execute(
        /* GraphQL */ `
          mutation($author: ID!, $content: String!, $friend: ID!) {
            newPost(
              author: $author
              content: $content
              taggedUsers: [$friend]
            ) {
              id
              content
              taggedUsers {
                name
              }
            }
          }
        `,
        { author: authorId, content: "hello world!", friend: friendId },
      );

      expect(errors).toBeUndefined();

      expect(data.newPost).toEqual({
        id: expect.any(String),
        content: "hello world!",
        taggedUsers: [
          {
            name: "friend",
          },
        ],
      });
    });
  });
});
