import { generateScript } from '@/pages/api/graphql/services/generateScriptElastic';
import { getChannelMessages } from '@/pages/api/graphql/services/getMessage';
import { queryMessagesElastic } from '@/pages/api/graphql/services/getMessageElastic';
import { sendMessage } from '@/pages/api/graphql/services/sendMessage';
import { sendMessageElastic } from '@/pages/api/graphql/services/sendMessageElastic';

const resolvers = {
  Query: {
    getChannelMessages: (parent: any, args: any, context: any) => {
      const { input } = args;
      const data = getChannelMessages(
        input.channel_id,
        input.server_id,
        context
      );
      return {
        error: null,
        data,
      };
    },
    queryMessagesElastic: async (parent: any, args: any, context: any) => {
      const { input } = args;
      const { searchQuery, searchOption, selectedDate } = input;
      const result = queryMessagesElastic(
        searchQuery,
        searchOption,
        selectedDate,
        context
      );
      return {
        error: null,
        data: result,
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
    sendMessageElastic: (parent: any, args: any, context: any) => {
      const { input } = args;
      return sendMessageElastic(input, context);
    },
    generateScript: (parent: any, args: any, context: any) => {
      return generateScript(context);
    },
  },
};

export default resolvers;
