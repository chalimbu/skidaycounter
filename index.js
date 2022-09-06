const { ApolloServer, gql } = require("apollo-server");
const { MockList } = require('@graphql-tools/mock');

const typeDefs = gql`
  scalar Date

  type SkiDay {
    id: ID!
    date: Date!
    mountain: String!
    conditions: Conditions
  }
  enum Conditions{
      POWDER
      HEAVY
      ICE
      THIN
  }

  type Query {
    totalDays: Int!
    allDays: [SkiDay]!
  }

  type Mutation{
      addDay(input: AddDayInput!):SkiDay
      removeDay(id: ID!): RemoveDayPayload!
  }

  input AddDayInput{
      date: Date!
      mountain: String!
      conditions: Conditions
  }

  type RemoveDayPayload {
    day: SkiDay!
    removed: Boolean
    totalBefore: Int
    totalAfter: Int
  }
`;

const mocks ={
  Date: () => "2022-04-01",
  String: ()=> "Cool data",
  Query: () => ({
    allDays: () => new MockList(8)
  })
}


const server = new ApolloServer({
  typeDefs,
  mocks: mocks,
});

server.listen().then(({ url }) => console.log(`server running at ${url}`));
