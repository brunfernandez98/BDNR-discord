import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation sendMessage($input: MessageInput!) {
    sendMessage(input: $input) {
      error
      message
    }
  }
`;
