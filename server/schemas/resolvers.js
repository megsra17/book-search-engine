const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, { _id, username }, context, info) => {
      if (username) {
        return await User.findOne({ username });
      }
      return await User.findById(_id);
    },
  },
  Mutation: {
    login: async (parent, { email, password }, context, info) => {
      const user = await User.findOne({ email });
      const correctPassword = await user.isCorrectPassword(password);
      let token;

      if (correctPassword) {
        return (token = signToken(user));
      }
      const auth = { token, user };
      return auth;
    },
  },
};

module.exports = resolvers;
