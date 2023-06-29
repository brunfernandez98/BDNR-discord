import { DocumentNode } from 'graphql';

import {
  GET_CHANNEL_MESSAGES,
  QUERY_MESSAGES_ELASTIC,
} from '@/hooks/query/apolloQuery';

import client from '@/config/apolloClient';

const query = async (
  query: DocumentNode,
  channel_id: number,
  server_id: number
) => {
  const result = await client.query({
    query,
    variables: {
      input: {
        channel_id,
        server_id,
      },
    },
    fetchPolicy: 'network-only',
  });

  return result;
};

const queryElastic = async (
  query: DocumentNode,
  searchQuery: string,
  searchOption: string,
  selectedDate: string
) => {
  const result = await client.query({
    query,
    variables: {
      input: {
        searchQuery,
        searchOption,
        selectedDate,
      },
    },
    fetchPolicy: 'network-only',
  });

  return result;
};

export const getMessagesService = async (
  channel_id: number,
  server_id: number
) => {
  try {
    const data = await query(GET_CHANNEL_MESSAGES, channel_id, server_id);
    return data.data.getChannelMessages;
  } catch (error) {
    return 'Error en la request';
  }
};

export const queryMessagesServiceElastic = async (
  searchQuery: string,
  searchOption: string,
  selectedDate: string
) => {
  try {
    const data = await queryElastic(
      QUERY_MESSAGES_ELASTIC,
      searchQuery,
      searchOption,
      selectedDate
    );
    return data.data.queryMessagesElastic;
  } catch (error) {
    console.error('Error en la request:', error);
    return 'Error en la request';
  }
};
