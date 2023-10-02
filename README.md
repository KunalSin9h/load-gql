# load-gql

A tiny GraphQL schema loader

# Usage

Add dependency

```bash
npm i @kunalsin9h/load-gql
```

Usage

```ts
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import loadGraphQL from "@kunalsin9h/load-gql";
import resolvers from "./resolvers";

// assuming graphql-schemas is a folder where all the schema files reside
const typeDefs = loadGraphQL("graphql-schemas", "temp.gql");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 3033,
  },
});

console.log(`Started server at ${url}`);
```
