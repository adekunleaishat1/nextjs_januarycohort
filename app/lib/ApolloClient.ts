import {ApolloClient, HttpLink, InMemoryCache, from} from "@apollo/client"
import { ErrorLink } from "@apollo/client/link/error"
import { CombinedGraphQLErrors } from "@apollo/client/errors"

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    for (const err of error.errors) {
      if (
        err.message === "invalid user" ||
        err.extensions?.code === "UNAUTHENTICATED"
      ) {
        localStorage.removeItem("isSignedIn");
        window.location.href = "/login";
        break;
      }
    }
  }
});

const httpLink = new HttpLink({
  uri: "/api/graphql",
});

export function CreateApolloclient() {
  return new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
}