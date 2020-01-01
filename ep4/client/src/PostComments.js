import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";

import useCurrentUser from "./useCurrentUser";

export default function PostComments(props) {
  const currentUser = useCurrentUser();
  const [commentText, setCommentText] = useState("");

  const [addComment] = useMutation(GQL_ADD_COMMENT, {
    update(cache, { data }) {
      const post = cache.readFragment({
        id: `Post_${props.postId}`,
        fragment: PostComments.fragments.postComment,
        fragmentName: "PostCommentsFragment",
      });

      cache.writeFragment({
        id: `Post_${props.postId}`,
        fragment: PostComments.fragments.postComment,
        fragmentName: "PostCommentsFragment",
        data: { ...post, comments: [...post.comments, data.addComment] },
      });
    },
  });
  function onCommentSubmit(event) {
    event.preventDefault();
    setCommentText("");

    addComment({
      variables: {
        content: commentText,
        author: currentUser.id,
        postId: props.postId,
      },
    });
  }
  return (
    <details>
      <summary>
        {props.comments.length} comment{props.comments.length > 1 ? "s" : ""}
      </summary>
      <ol>
        {props.comments.map(cmt => (
          <li key={cmt.id}>
            {cmt.content} by{" "}
            {cmt.author.id === currentUser.id ? "you" : cmt.author.name}
          </li>
        ))}
      </ol>
      <form onSubmit={onCommentSubmit}>
        <input
          type="text"
          placeholder="add comment"
          value={commentText}
          onChange={event => setCommentText(event.currentTarget.value)}
        />
      </form>
      <style jsx>{`
        details {
          width: 200px;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </details>
  );
}

const GQL_ADD_COMMENT = gql`
  mutation($postId: ID!, $author: ID!, $content: String!) {
    addComment(post: $postId, author: $author, content: $content) {
      id
      author {
        id
        name
      }
      content
    }
  }
`;

PostComments.fragments = {
  postComment: gql`
    fragment PostCommentsFragment on Post {
      comments {
        id
        author {
          id
          name
        }
        content
      }
    }
  `,
};
