import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import React from "react";
import Link from "next/link";

import NewPost from "./NewPost";
import Spinner from "./Spinner";
import UserPosts from "./UserPosts";
import useCurrentUser from "./useCurrentUser";

export default function UserDetail(props) {
  const { data, errors, loading } = useQuery(GQL_USER, {
    variables: { id: props.id },
  });
  const currentUser = useCurrentUser();
  if (loading) {
    return <Spinner />;
  }

  if (errors) {
    return <pre>{JSON.stringify(errors, null, 2)}</pre>;
  }

  if (!data.user) {
    return (
      <div>
        User does not exist{" "}
        <Link href="/">
          <a>register here</a>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{data.user.name}</h1>
      {currentUser.id === data.user.id && <NewPost userId={data.user.id} />}
      <UserPosts posts={data.user.posts} />
    </div>
  );
}

const GQL_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      name
      ...UserPostsFragment
    }
  }

  ${UserPosts.fragments.userPosts}
`;
