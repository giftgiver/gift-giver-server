const hash = require('../../modules/auth/hash');
const auth = require('../../modules/auth/auth');
const uuidv4 = require('uuid/v4');
const write = require('../../modules/dynamo/write/writeService');
const read = require('../../modules/dynamo/read/readService');

const resolvers = {
  Query: {
    healthcheck: () => 'success',
    getUser: async (parent, { email }, context, info) => {
      const user = await read.getUser({ email });

      if (user.email === email) {
        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber
        };
      } else {
        return {};
      }
    },
    login: async (parent, { login }, context, info) => {
      try {
        const user = await read.getUser({ email: login.email });

        if (user) {
          const passwordMatch = await hash.compareHash({
            password: login.password,
            hash: user.passwordHash
          });
          delete user.passwordHash; // passwordHash is not part of the return schema, on purpose.
          if (user.email === login.email && passwordMatch) {
            return user;
          }
        } else {
          return { error: 'User Not Found' };
        }
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    }
  },
  Mutation: {
    async createUser(parent, { user }, context, info) {
      const id = uuidv4();
      const jwt = auth.getSignedJwt(user.email);

      const passwordHash = await hash.hashPassword({ password: user.password });

      user.id = id;
      user.passwordHash = passwordHash;

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
