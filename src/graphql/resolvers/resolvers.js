const resolvers = {
  Query: {
    healthcheck: () => 'success',
    getUser: async (parent, { id }, context, info) => {
      const user = await read.getUser({ id });
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber
      };
    }
  },
  Mutation: {
    async createUser(parent, { user }, context, info) {
      const id = uuidv4();
      user.id = id;

      const jwt = auth.getSignedJwt(id);

      try {
        await write.createUser({ user });

        return {
          email: user.email,
          token: jwt
        };
      } catch (error) {
        // TODO: fix logging and log error
        // TODO: look up logging patterns for asnyc throws
        console.error(error);
        throw new Error(error);
      }
    }
  }
};

module.exports = resolvers;
