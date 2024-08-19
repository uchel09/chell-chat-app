export interface User {
  _id: string;
  username: string;
  email: string;
  avatar: {
    publicId: string;
    imageUrl: string;
  };
  role: string;
  gender: string;
  bio: string;
  link: string;
  friends: User[];
  friendRequestsSent: FriendRequest[];
  friendRequestsReceived: FriendRequest[];
  __v: number;
}


export interface FriendRequest {
  _id: string;
  sender: User;
  receiver: string;
  status: string;
  createdAt: Date;
  __v: number;
}
