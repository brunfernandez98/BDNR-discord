type User = {
  id: number;
  email: string;
  username: string;
  hastag: string;
  avatar: string;
  channel: Channel[];
};

type UserCredential = {
  id: number;
  username: string;
  email: string;
  avatar: string;
};

type Channel = {
  id: number;
  name: string;
  users: User[];
  messages: Message[];
};

type Message = {
  id: number;
  content: string;
  date: Date;
  user: User;
};
