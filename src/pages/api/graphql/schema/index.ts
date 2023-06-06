import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    getChannelMessages(input: GetMessageInput!): ResponseMessage
  }

  type Mutation {
    sendMessage(input: MessageInput!): Response
  }

  type Message {
    id: ID
    channel_id: ID
    user_id: ID
    text: String
    mentioned_users: [ID]
    pinned: Boolean
    server_id: ID
    creation_date: String
  }

  type Response {
    error: String
    message: String
  }

  type ResponseMessage {
    error: String
    data: [Message]
  }

  input MessageInput {
    channel_id: ID
    user_id: ID
    text: String
    mentioned_users: [ID]
    pinned: Boolean
    server_id: ID
  }

  input GetMessageInput {
    channel_id: ID
  }
`;

export default typeDefs;
