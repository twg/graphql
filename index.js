const express = require("express");
const app = express();
const moment = require("moment");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = graphql;
const { graphqlHTTP } = require("express-graphql");

const userData = require("./data.json");

// app.use("/", (req, res, next) => {
//   res.header("access-control-allow-origin", "*");
//   res.end();
//   next();
// });

// app.get("/user", (req, res) => {
//   res.send(userData);
//   res.end();
// });
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return userData;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parent, args) {
        userData.push({
          id: userData.length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
        });
        return args;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true, //optional
  })
);

app.listen(3000, () => console.log("app is running..."));
