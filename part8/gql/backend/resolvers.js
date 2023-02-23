const Book = require("./models/book");
const Author = require("./models/author");
const { AuthenticationError, UserInputError } = require("apollo-server");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const config = require("./config");
const { PubSub } = require("graphql-subscriptions");
const pubSub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate("author", {
          name: 1,
        });
      }

      return Book.find({}).populate("author", { name: 1 });
    },
    allAuthors: async () => Author.find({}),

    me: (root, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      console.log("add request");
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author, bookCount: 0 });
        await author.save().catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        });
      }
      const book = new Book({ ...args, author: author });

      try {
        author.bookCount += 1;
        await author.save();
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      await pubSub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      return author.save();
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return {
        token: jwt.sign(userForToken, config.SECRET),
        favouriteGenre: user.favouriteGenre,
      };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
