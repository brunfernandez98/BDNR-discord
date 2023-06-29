import { v1 as uuidv1 } from 'uuid';

import { MessageInput } from '@/data/types';
const query = `
  INSERT INTO discord.messages (
    id,
    channel_id,
    user_id,
    text,
    links,
    hashtags,
    mentioned_users,
    pinned,
    creation_date,
    server_id
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, toTimestamp(now()), ?)
`;

export const sendMessage = async (
  {
    channel_id,
    user_id,
    text,
    links,
    hashtags,
    mentioned_users,
    pinned,
    server_id,
  }: MessageInput,
  context: any
) => {
  try {
    const id = uuidv1();
    const params = [
      id,
      channel_id,
      user_id,
      text,
      links,
      hashtags,
      mentioned_users,
      pinned,
      server_id,
    ];

    await context.cassandraClient.execute(query, params, { prepare: true });

    console.log('Mensaje agregado exitosamente');
  } catch (error) {
    console.error('Error al agregar el mensaje:', error);
  }
};
