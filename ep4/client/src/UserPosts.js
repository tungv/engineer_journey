import { gql } from "apollo-boost";
import React from "react";
import PostComments from "./PostComments";

export default function UserPosts({ posts }) {
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <p>{post.content}</p>
          <PostComments postId={post.id} comments={post.comments} />
        </article>
      ))}
      <style jsx>{`
        article {
          padding: 12px;
          margin-bottom: 12px;
        }
      `}</style>
    </div>
  );
}

UserPosts.fragments = {
  userPosts: gql`
    fragment UserPostsFragment on User {
      posts {
        id
        content
        ...PostCommentsFragment
      }
    }

    ${PostComments.fragments.postComment}
  `,
};
