import { jwtDecode } from "jwt-decode";

// Definisikan interface untuk payload token
interface User {
  _id?: string;
  username?: string;
  email?: string;
  role?: string;
  avatar?: { publicId: string; imageUrl: string };
  gender?: string;
  bio?: string;
  link?: string;
  friends?: string[];
  friendRequestSent?: string[];
  friendRequestReceived?: string[];
  createdAt?: string;
  updatedAt?: string;
}
interface DecodedToken {
  iat?: number;
  exp?: number;
  user: User;
}

// Fungsi untuk decode token
export const decodedUser = (token: string): User => {
  try {
    // Deklarasikan tipe DecodedUser untuk jwtDecode
    const decoded = jwtDecode<DecodedToken>(token).user;
    console.log(decoded);
    // Kembalikan data yang telah di-decode dengan default values jika perlu
    return {
      _id: decoded._id ?? "",
      username: decoded.username ?? "",
      email: decoded.email ?? "",
      role: decoded.role ?? "user",
      avatar: decoded.avatar ?? {
        publicId: "noAvatar",
        imageUrl: "defaultAvatarURL",
      },
      gender: decoded.gender ?? "male",
      bio: decoded.bio ?? "",
      link: decoded.link ?? "",
      friends: decoded.friends ?? [],
      friendRequestSent: decoded.friendRequestSent ?? [],
      friendRequestReceived: decoded.friendRequestReceived ?? [],
      createdAt: decoded.createdAt ?? "",
      updatedAt: decoded.updatedAt ?? "",
    };
  } catch (error) {
    console.error("Failed to decode token:", error);

    return {};
  }
};
