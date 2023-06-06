import { MessageResponse } from '@/data/types';

const query = `
  SELECT id, channel_id, user_id, text, mentioned_users, pinned, creation_date, server_id
  FROM discord.messages
  WHERE channel_id = ?
  ORDER BY creation_date ASC
`;

export const getChannelMessages = async (
  channel_id: number,
  context: any
): Promise<MessageResponse[]> => {
  try {
    const params = [channel_id];

    const result = await context.cassandraClient.execute(query, params, {
      prepare: true,
    });

    const messages: MessageResponse[] = result.rows.map((row: any) => {
      return {
        id: row.id,
        channel_id: row.channel_id,
        user_id: row.user_id,
        text: row.text,
        mentioned_users: row.mentioned_users,
        pinned: row.pinned,
        creation_date: row.creation_date,
        server_id: row.server_id,
      };
    });

    return messages;
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
    return [];
  }
};
