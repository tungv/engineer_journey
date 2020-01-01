import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo-client";

export default function Layout(props) {
  return (
    <ApolloProvider client={client}>
      <main>
        <style global jsx>{`
          body,
          html {
            margin: 0;
            padding: 0;
          }
        `}</style>
        {props.children}
      </main>
    </ApolloProvider>
  );
}
