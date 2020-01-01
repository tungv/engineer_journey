import React from "react";

import Layout from "../../Layout";
import UserDetail from "../../UserDetail";

export default function UserPage({ userId }) {
  return (
    <Layout>
      <UserDetail id={userId} />
    </Layout>
  );
}

UserPage.getInitialProps = ctx => ({ userId: ctx.query.userId });
