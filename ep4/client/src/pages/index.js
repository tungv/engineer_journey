import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import Router from "next/router";

import Layout from "../Layout";

export default function RegisterPage() {
  const [register] = useMutation(GQL_REGISTER, {
    onCompleted: data => {
      Router.push("/user/[userId]", `/user/${data.register.id}`);
    },
  });
  const [name, setName] = useState("");
  function onSubmit(event) {
    event.preventDefault();
    setName("");

    register({ variables: { name } });
  }

  return (
    <Layout>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={name}
          onChange={event => setName(event.currentTarget.value)}
          placeholder="new user name"
        />
        <style jsx>{`
          form {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
          }

          input {
            font-size: 20px;
            padding: 12px;
          }
        `}</style>
      </form>
    </Layout>
  );
}

const GQL_REGISTER = gql`
  mutation($name: String!) {
    register(name: $name) {
      id
    }
  }
`;
