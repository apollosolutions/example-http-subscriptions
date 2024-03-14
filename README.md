# example-http-subscriptions

This repository demonstrates how to get real-time data with Federated Subscriptions via a HTTP Multipart based subscription with the router in HTTP callback mode.

## Running the Example

> Note: To run this example, you will need a GraphOS Enterprise plan and must create `/router/.env` based on `/router/.env.example` which exports `APOLLO_KEY` and `APOLLO_GRAPH_REF`.

1. Run the subgraph from the `/subgraph` directory with `npm run dev`
1. In the `/router` directory, download the router by running `./download_router.sh`
1. In the `/router` directory, compose the schema by running `./create_local_schema.sh`
1. In the `/router` directory, run the router by running `./start_router.sh`

Now if you run this code in the browser (http://127.0.0.1:4000/), you will be able to query the router including running a subscription to get data.

## Code Highlights

In the Router config (`router/router-config.yaml`), subscriptions are enabled, set to `callback` mode, and enabled for the subgraph named `subgraph`. Note that in a non-local environment, the `public_url` must be accessible by the subgraphs as they will use this URL to send the subscription data as it becomes available.

In `subgraph/src/index.js`, the `ApolloServerPluginSubscriptionCallback` plugin is added to `ApolloServer` to enable callback protocol support.

In `subgraph/src/schema/Query.graphql`, we create the schema for the subscription and define the resolver for this subscription in `subgraph/src/resolvers.js`. Note that the resolver is a very basic example for demonstration purposes. In a real code base, you'd be likely hooking up to a pub/sub, a queue, etc.
