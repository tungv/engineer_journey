exports.registerUser = async function(execute, name) {
  const { data } = await execute(
    /* GraphQL */ `
      mutation($name: String!) {
        register(name: $name) {
          id
          name
        }
      }
    `,
    { name },
  );

  return data.register.id;
};

exports.newPost = async function(execute, author, content, taggedUsers) {
  const { data } = await execute(
    /* GraphQL */ `
      mutation($author: ID!, $content: String!, $taggedUsers: [ID!]) {
        newPost(author: $author, content: $content, taggedUsers: $taggedUsers) {
          id
        }
      }
    `,
    { author, content, taggedUsers },
  );

  return data.newPost.id;
};

exports.addComment = async function(execute, post, author, content) {
  const { data } = await execute(
    /* GraphQL */ `
      mutation($commenter: ID!, $content: String!, $post: ID!) {
        addComment(author: $commenter, content: $content, post: $post) {
          id
        }
      }
    `,
    { commenter: author, content, post },
  );

  return data.addComment.id;
};
