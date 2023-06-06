import { getChannelMessages } from '@/pages/api/graphql/services/getMessage';
import { sendMessage } from '@/pages/api/graphql/services/sendMessage';

const resolvers = {
  Query: {
    getChannelMessages: (parent: any, args: any, context: any) => {
      const { input } = args;
      const data = getChannelMessages(input.channel_id, context);

      return {
        error: null,
        data,
      };
    },
  },
  Mutation: {
    sendMessage: (parent: any, args: any, context: any) => {
      const { input } = args;
      sendMessage(input, context);
      return {
        error: null,
        message: 'Mensaje enviado exitosamente',
      };
    },
  },
};

export default resolvers;
