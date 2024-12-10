import { ChatMessage } from "./chat-message.interface";
import { DBSchema } from "idb"; 
import { ChatUser } from "./chat-user.interface";

export interface ChatDB extends DBSchema {
    ChatGroups: {
        key: string;
        value: { chatId: string; messages: ChatMessage[] };
    };

    Users: {
        key: string;
        value: ChatUser;
      };
}