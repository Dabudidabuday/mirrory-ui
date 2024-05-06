import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `http://${import.meta.env.VITE_BASE_URL}:8000/graphql`,
});
