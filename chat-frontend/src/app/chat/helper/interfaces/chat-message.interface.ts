import { MessageType } from "../beans/message-type.enum";

export interface ChatMessage {
    senderId?: string;
    senderName?: string;
    messageType: MessageType;
    content: string;
}