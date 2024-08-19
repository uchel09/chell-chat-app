export interface Conversation {
  _id: string;
  recipients: recipient[];
  lastMessage: string;
  media: string[];
  isShow: boolean;
  unreadMessagesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface recipient {
  _id: string;
  avatar: {
    publicId: string;
    imageUrl: string;
  };
  username: string;
}

export interface IMessages {
  _id: string;
  conversation: string;
  createdAt: Date;
  updatedAt: Date;
  isRead: boolean;
  media: string[];
  recipient: string;
  text: string;
  sender: string;
}
