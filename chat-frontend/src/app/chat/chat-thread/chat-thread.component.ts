import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../services/message.service';
import { ChatMessage } from '../helper/interfaces/chat-message.interface';
import { UserService } from '../services/user.service';
import { ChatUser } from '../helper/interfaces/chat-user.interface';
import { MessageType } from '../helper/beans/message-type.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.scss']
})
export class ChatThreadComponent {

  chatId!: string;
  chatIdSubscription: Subscription = undefined as any;

  user!: ChatUser;
  userUpdateSubscription: Subscription = undefined as any;

  messages: ChatMessage[] = [];
  messagesSubscription: Subscription = undefined as any;
  newMessagesSubscription: Subscription = undefined as any;


  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit() {

    this.chatIdSubscription = this.route.params.subscribe(params => {
      const nextChatId = params['chatId'];
      if (nextChatId) {
        const currentChatId = this.chatId;
        this.chatId = nextChatId;
        this.initializeThread(currentChatId);
      }
    });

    this.messagesSubscription = this.messageService.getMessages().subscribe((messageObject: any) => {
      if (messageObject && messageObject.chatId === this.chatId) {
        this.messages = messageObject.messages;
      }
    });

    this.newMessagesSubscription = this.messageService.newMessageReceived().subscribe(messageObject => {
      if (messageObject && messageObject.chatId === this.chatId) {

        const message = messageObject.message;
        const selfUserAction = message.senderId === this.user.userId && message.messageType === MessageType.USER_ACTION;

        if (!selfUserAction) {
          this.messages.unshift(message);
        }
      } 
    });

    this.userUpdateSubscription = this.userService.getUserUpdate().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnDestroy() {
    console.log('thread destroyed');
    // this.messageService.disconnect(this.chatId);

    if (this.chatIdSubscription) {
      this.chatIdSubscription.unsubscribe();
    }
    
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }

    if (this.newMessagesSubscription) {
      this.newMessagesSubscription.unsubscribe();
    }

    if (this.userUpdateSubscription) {
      this.userUpdateSubscription.unsubscribe();
    }
  }


  async initializeUser() {
    const user = await this.userService.getUser();
    if (user) {
      this.user = user;
    } else {
      console.error('User is null or undefined');
    }
  }

  async initializeThread(currentChatId: string) {
    await this.userService.setupChatGroup(this.chatId);
    this.messageService.loadMessages(this.chatId);
    this.initializeUser();
  }


  sendMessage(content: string) {
    const message: ChatMessage = {
      senderId: this.user.userId,
      senderName: this.user.userName,
      messageType: MessageType.CHAT,
      content
    };
    this.messageService.sendMessage(this.chatId, message);
  }
}
