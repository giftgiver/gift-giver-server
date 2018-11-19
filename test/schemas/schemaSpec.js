import { mockServer } from 'graphql-tools';
import schema from './mySchema.graphql';

const myMockServer = mockServer(schema);
myMockServer.query(`{
  allUsers: {
    id
    name
  }
}`);
