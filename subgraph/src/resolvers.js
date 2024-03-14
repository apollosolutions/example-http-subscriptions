const resolvers = {
  Query: {
    hello: () => {
      return "Hello World!";
    },
  },
  Subscription: {
    stockUpdate: {
      // This is an example using an async generator
      // For demonstration purposes, we're just generating random numbers here and yielding them
      // In a real code base, you'd likely be hooking up to some kind of pub/sub mechanism, queue, etc
      subscribe: async function* () {
        let price = 40;
        while (true) {
          const changePercent = Math.random() * 0.2 - 0.1; // Generate a random number between -0.1 and 0.1
          const change = price * changePercent;
          price = price + change;

          yield {
            stockUpdate: {
              change,
              changePercent,
            },
          };
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      },
    },
  },
};

export default resolvers;
