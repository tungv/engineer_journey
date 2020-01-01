import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import UserPosts from "./UserPosts";

export default function NewPost(props) {
  const [content, setContent] = useState("");
  const [newPost] = useMutation(GQL_NEW_POST, {
    update(cache, { data }) {
      const user = cache.readFragment({
        id: `User_${props.userId}`,
        fragment: UserPosts.fragments.userPosts,
        fragmentName: "UserPostsFragment",
      });

      cache.writeFragment({
        id: `User_${props.userId}`,
        fragment: UserPosts.fragments.userPosts,
        fragmentName: "UserPostsFragment",
        data: { ...user, posts: [data.newPost, ...user.posts] },
      });
    },
  });

  function onSubmit(event) {
    event.preventDefault();
    setContent("");

    newPost({ variables: { content, author: props.userId } });
  }

  return (
    <form onSubmit={onSubmit}>
      <textarea
        rows={3}
        value={content}
        onChange={event => setContent(event.currentTarget.value)}
      ></textarea>
      <button>post</button>
      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          width: 250px;
        }
      `}</style>
    </form>
  );
}

const GQL_NEW_POST = gql`
  mutation($content: String!, $author: ID!) {
    newPost(content: $content, author: $author) {
      id
      content
      comments {
        author {
          id
          name
        }
        content
      }
    }
  }
`;
