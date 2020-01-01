import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import fetch from "isomorphic-unfetch";

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: "http://localhost:4000/graphql",
      fetch,
      cache: new InMemoryCache().restore(initialState || {}),
    }),
);
