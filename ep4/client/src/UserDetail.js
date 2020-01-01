import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import React from "react";

import Spinner from "./Spinner";

export default function UserDetail(props) {
  const { data, errors, loading } = useQuery(GQL_USER, {
    variables: { id: props.id },
  });
  if (loading) {
    return <Spinner />;
  }

  if (errors) {
    return <pre>{JSON.stringify(errors, null, 2)}</pre>;
  }

  return (
    <div>
      <h1>{data.user.name}</h1>
    </div>
  );
}

const GQL_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      name
    }
  }
`;
