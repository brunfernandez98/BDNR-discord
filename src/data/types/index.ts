export type User = {
  id: number;
  email: string;
  username: string;
  hastagh: string;
  avatar: string;
  channel: Channel[];
};

export type Server = {
  id: number;
  name: string;
  channels: Channel[];
  users: User[];
};

export type UserCredential = {
  id: number;
  username: string;
  email: string;
  avatar: string;
  hastagh: string;
};

export type Channel = {
  channel_id: number;
  name: string;
  users: User[];
  messages: Message[];
};

export type Message = {
  id: number;
  content: string;
  date: Date;
  user: User;
};

export type MessageInput = {
  channel_id: number;
  user_id: number;
  hashtags?: string[];
  links?: string[];
  text: string;
  mentioned_users?: number[];
  pinned?: boolean;
  server_id: number;
};

export type MessageInputElastic = {
  message_id?: string;
  channel: string;
  user: string;
  text: string;
  links?: string[];
  hashtags?: string[];
  mentioned_users?: string[];
  pinned: boolean;
  creation_date: string;
};

export type MessageResponse = {
  id: number;
  channel_id: number;
  user_id: number;
  text: string;
  links: string[];
  hashtags: string[];
  mentioned_users: number[];
  creation_date: string;
  pinned: boolean;
  server_id: number;
};

export type MessageResponseElastic = {
  id: number;
  channel: string;
  user: string;
  text: string;
  links: string[];
  hashtags: string[];
  multimedia: string;
  mentioned_users: number[];
  creation_date: string;
  pinned: boolean;
  server: string;
};
