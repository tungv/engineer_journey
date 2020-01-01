import React from "react";
import cookies from "next-cookies";
import { UserContext } from "../../useCurrentUser";
import Layout from "../../Layout";
import UserDetail from "../../UserDetail";

export default function UserPage({ userId, currentUserId }) {
  return (
    <UserContext.Provider value={{ id: currentUserId }}>
      <Layout>
        <UserDetail id={userId} />
      </Layout>
    </UserContext.Provider>
  );
}

UserPage.getInitialProps = ctx => ({
  userId: ctx.query.userId,
  currentUserId: cookies(ctx).uid || "1",
});
