import { DocumentNode } from 'graphql';

import { SEND_MESSAGE } from '@/hooks/command/apolloCmd';

import { MessageInput } from '@/data/types';

import client from '@/config/apolloClient';

const mutation = async (mutation: DocumentNode, paramsMutation: any) => {
  const result = await client.mutate({
    mutation,
    variables: {
      input: {
        ...paramsMutation,
      },
    },
  });

  return result;
};

export const sendMessageService = async (messageInput: MessageInput) => {
  try {
    const data = await mutation(SEND_MESSAGE, messageInput);
    return data.data.sendMessage;
  } catch (error) {
    console.log(error);
    return 'Error en la request';
  }
};
