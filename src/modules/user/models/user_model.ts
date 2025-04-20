export interface ChatMessage {
  _id?: string;
  chatId: string;
  sender: string;         // User ID
  message: string;
  createdAt: Date;
}

export interface ChatModel {
  _id?: string;
  isGroup: boolean;
  members: string[];       // Array of user ObjectIds
  messages: ChatMessage[]; // Optional, if you embed messages
  createdAt: Date;

}


export interface MessageModel {
  _id?: string;
  chatId: string;
  sender: string;
  message: string;
  createdAt: Date;
}

export interface ChatRequestModel {
  _id?: string;
  fromUserId: string;  // who sent the request
  toUserId: string;    // who received the request
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}
