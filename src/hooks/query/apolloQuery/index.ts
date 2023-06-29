import { gql } from '@apollo/client';

export const GET_CHANNEL_MESSAGES = gql`
  query getChannelMessages($input: GetMessageInput!) {
    getChannelMessages(input: $input) {
      error
      data {
        id
        channel_id
        user_id
        links
        hashtags
        text
        mentioned_users
        pinned
        creation_date
        server_id
      }
    }
  }
`;
