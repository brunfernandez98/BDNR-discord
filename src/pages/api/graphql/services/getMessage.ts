import { MessageResponse } from '@/data/types';

const query = `
  SELECT id, channel_id, user_id, text, hashtags, links, mentioned_users, pinned, creation_date, server_id
  FROM discord.messages
  WHERE channel_id = ? AND server_id = ?
`;

export const getChannelMessages = async (
  channel_id: number,
  server_id: number,
  context: any
): Promise<MessageResponse[]> => {
  try {
    const params = [channel_id, server_id];
    const result = await context.cassandraClient.execute(query, params, {
      prepare: true,
    });

    const messages: MessageResponse[] = result.rows.map((row: any) => {
      const creationDate = new Date(row.creation_date);
      const fecha = creationDate.toISOString().split('T')[0];
      const horas = creationDate.getHours().toString().padStart(2, '0');
      const minutos = creationDate.getMinutes().toString().padStart(2, '0');

      const fechaHoraString = `${fecha} ${horas}:${minutos}`;
      return {
        id: row.id,
        channel_id: row.channel_id,
        user_id: row.user_id,
        text: row.text,
        links: row.links,
        hashtags: row.hashtags,
        mentioned_users: row.mentioned_users,
        pinned: row.pinned,
        creation_date: fechaHoraString,
        server_id: row.server_id,
      };
    });

    return messages;
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
    return [];
  }
};
