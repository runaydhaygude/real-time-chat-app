import { Component, Input } from '@angular/core';
import { ChatMessage } from '../../helper/interfaces/chat-message.interface';
import { MessageType } from '../../helper/beans/message-type.enum';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent {
  MessageType = MessageType;

  @Input() message!: ChatMessage;

  @Input() isSelfMessage!: boolean;
}
