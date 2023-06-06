import { DocumentNode } from 'graphql';

import { GET_CHANNEL_MESSAGES } from '@/hooks/query/apolloQuery';

import client from '@/config/apolloClient';

const query = async (query: DocumentNode, paramsQuery: any) => {
  const result = await client.query({
    query,
    variables: {
      input: {
        channel_id: paramsQuery,
      },
    },
    fetchPolicy: 'network-only',
  });

  return result;
};

export const getMessagesService = async (channel_id: number) => {
  try {
    const data = await query(GET_CHANNEL_MESSAGES, channel_id);
    return data.data.getChannelMessages;
  } catch (error) {
    return 'Error en la request';
  }
};
