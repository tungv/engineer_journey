import App from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import withApollo from "../withApollo";

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo, ...others } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
