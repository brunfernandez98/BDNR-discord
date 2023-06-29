import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    getChannelMessages(input: GetMessageInput!): ResponseMessage
    queryMessagesElastic(input: GetQueryInput!): ResponseMessageElastic
  }

  type Mutation {
    sendMessage(input: MessageInput!): Response!
    sendMessageElastic(input: MessageInputElastic!): Response!
    generateScript(input: Boolean): Response!
  }

  type Message {
    id: ID
    channel_id: ID
    user_id: ID
    text: String
    links: [String]
    hashtags: [String]
    mentioned_users: [ID]
    pinned: Boolean
    server_id: ID
    creation_date: String
  }

  type MessageElastic {
    id: ID
    channel: String
    user: String
    text: String
    multimedia: String
    links: [String]
    hashtags: [String]
    mentioned_users: [String]
    pinned: Boolean
    server: String
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

  type ResponseMessageElastic {
    error: String
    data: [MessageElastic]
  }

  input MessageInput {
    channel_id: ID
    user_id: ID
    text: String
    links: [String]
    hashtags: [String]
    mentioned_users: [ID]
    pinned: Boolean
    server_id: ID
  }

  input GetMessageInput {
    channel_id: ID
    server_id: ID
  }

  input GetQueryInput {
    searchQuery: String
    searchOption: String
    selectedDate: String
  }

  input MessageInputElastic {
    message_id: ID
    channel: String
    user: String
    multimedia: String
    text: String
    links: [String]
    hashtags: [String]
    mentioned_users: [String]
    pinned: Boolean
    creation_date: String
  }
`;

export default typeDefs;
