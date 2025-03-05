import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

import * as SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';
import { RxStompService, StompConfig, StompRService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { ChatMessage } from '../helper/interfaces/chat-message.interface';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from './user.service';
import { MessageType } from '../helper/beans/message-type.enum';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messagesSubject = new BehaviorSubject<any[]>([]);
  private newMessageSubject = new BehaviorSubject<any>(null);

  private websocketSubscription: any;

  constructor(
    private storageService: StorageService,
    private stompService: StompRService,
    private configService: ConfigService,
    private userService: UserService
  ) {}


  private connect(chatId: string) {
    console.log('connect ', chatId);
    this.stompService.config = this.stompConfig();

      this.stompService.initAndConnect();

      this.sendUserConnectedMessage(chatId);

      this.websocketSubscription = this.stompService.subscribe('/ws/topic/chat/' + chatId).subscribe((message: any) => {
        const msg: ChatMessage = JSON.parse(message.body);
        this.handleNewMessage(chatId, msg);
      });
  }

  private disconnectAndReconnect(currentChatId: string, chatId: string): void {
    console.log('disconnect with existing websocket connection for ', chatId);
    
    if (currentChatId) {
      this.sendUserDisonnectedMessage(currentChatId);
    }

    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
      this.websocketSubscription = null;
    }
  
    this.stompService.deactivate().then(() => {
      this.connect(chatId);
      console.log('connected with new websocket connection for ', chatId);
    }).catch((error) => {
      console.error('Error while disconnecting:', error);
    });
  }

  public disconnect(chatId: string) {
    this.sendUserDisonnectedMessage(chatId);

    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
      this.websocketSubscription = null;
    }

    this.stompService.deactivate().then(() => {
      console.log('disconnect with existing websocket connection');
    });
  }


  private stompConfig(): StompConfig {
    const wsStompEndpoint = `${this.configService.apiHost}/ws/websocket-connection`;
    const provider = function() {
      return new SockJS(wsStompEndpoint);
    };

    const config = new StompConfig();
    config.url = provider;
    config.heartbeat_in = 0;
    config.heartbeat_out = 0;
    config.reconnect_delay = 10000;

    return config;
  }

  private async handleNewMessage(chatId: string, msg: any) {
    await this.storageService.storeMessage(chatId, msg);
    this.newMessageSubject.next(msg);
  }

  public async loadMessages(currentChatId: string, chatId: string) {
    const chatName = await this.userService.getChatName(chatId);
    const messages = await this.storageService.loadMessages(chatId, chatName + "");
    if (messages) {
      this.messagesSubject.next(messages);
    }

    this.disconnectAndReconnect(currentChatId, chatId);
  }

  getMessages() {
    return this.messagesSubject.asObservable();
  }

  newMessageReceived() {
    return this.newMessageSubject.asObservable();
  }

  public sendMessage(chatId: string, message: any) {
    this.stompService.publish('/ws/app/chat/' + chatId, JSON.stringify(message));
  }

  async sendUserConnectedMessage(chatId: string) {
    const user = await this.userService.getUser();
    const connectMessage =  {
      senderId: user?.userId,
      senderName: user?.userName,
      messageType: MessageType.USER_ACTION,
      content: `${user?.userName} joined the chat`
    };

    this.sendMessage(chatId, connectMessage);
  }

  async sendUserDisonnectedMessage(chatId: string) {
    const user = await this.userService.getUser();
    const disconnectMessage =  {
      senderId: user?.userId,
      senderName: user?.userName,
      messageType: MessageType.USER_ACTION,
      content: `${user?.userName} left the chat`
    };

    this.sendMessage(chatId, disconnectMessage);
  }

  async sendUserNameChangedMessage(chatId: string, newUserName: string) {
    const user = await this.userService.getUser();
    const userNameChangedMessage =  {
      senderId: user?.userId,
      senderName: user?.userName,
      messageType: MessageType.USER_ACTION,
      content: `${user?.userName} changed their username to ${newUserName}`
    };

    this.sendMessage(chatId, userNameChangedMessage);
  }
}
