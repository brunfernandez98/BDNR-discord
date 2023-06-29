import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation sendMessage($input: MessageInput!) {
    sendMessage(input: $input) {
      error
      message
    }
  }
`;

export const SEND_MESSAGE_ELASTIC = gql`
  mutation sendMessageElastic($input: MessageInputElastic!) {
    sendMessageElastic(input: $input) {
      error
      message
    }
  }
`;
