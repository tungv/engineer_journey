const { addComment, newPost, registerUser } = require("./helpers");
const withExecute = require("./withExecute");

describe("query user(id)", () => {
  it("should return user with a given id", () => {
    return withExecute(async execute => {
      const id = await registerUser(execute, "tung");
      const mike = await registerUser(execute, "Mike");
      const eden = await registerUser(execute, "Eden");

      await newPost(execute, id, "My first post!");
      const postId = await newPost(execute, id, "Happy new year", [mike, eden]);
      await addComment(execute, postId, mike, "You too");
      await addComment(execute, postId, eden, "you three");

      const { errors, data } = await execute(
        /* GraphQL */ `
          query($id: ID!) {
            user(id: $id) {
              name
              posts {
                content
                comments {
                  content
                  author {
                    name
                  }
                }
              }
            }
          }
        `,
        { id },
      );

      expect(errors).toBeUndefined();

      expect(data.user).toEqual({
        name: "tung",
        posts: [
          {
            content: "Happy new year",
            comments: [
              {
                content: "You too",
                author: { name: "Mike" },
              },
              {
                content: "you three",
                author: { name: "Eden" },
              },
            ],
          },
          {
            content: "My first post!",
            comments: [],
          },
        ],
      });
    });
  });
});
