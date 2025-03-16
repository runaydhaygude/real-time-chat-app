import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

import * as SockJS from 'sockjs-client';
import { StompConfig, StompRService } from '@stomp/ng2-stompjs';
import { ChatMessage } from '../helper/interfaces/chat-message.interface';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from './user.service';
import { MessageType } from '../helper/beans/message-type.enum';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messagesSubject = new BehaviorSubject<any>([]);
  private newMessageSubject = new BehaviorSubject<any>(null);

  private websocketSubscription: Map<string, any>;
  private isConnecting: boolean = false;

  apiUrl: string = 'http://localhost:8080/ws';
  contextPath: string = '/ws';

  constructor(
    private storageService: StorageService,
    private stompService: StompRService,
    private configService: ConfigService,
    private userService: UserService
  ) {
    this.apiUrl = `${this.configService.apiHost}${this.contextPath}`;
    this.websocketSubscription = new Map<string, any>()
  }


  async connect() {
    if (this.stompService.connected()) {
      console.log('already connected');
      return;
    }

    if (this.isConnecting) {
      console.log("Already trying to connect...");
      return;
    }

    if (this.stompService && this.stompService.state.getValue() === 3) {
      console.log("Still deactivating, waiting before reconnecting...");
      this.stompService.state.subscribe((state) => {
        if (state === 0) { // 0 = CLOSED
          this.connect();
        }
      });
      return;
    }

    this.stompService.config = this.stompConfig();

    this.isConnecting = true;
    this.stompService.initAndConnect();
  }

  async connectAndSubscribeToAll(chatIds: string[]) {
    await this.connect();

    chatIds.forEach(chatId => {
      this.subscribe(chatId);
    });
  }

  public async connectAndSubscribe(chatId: string) {
    await this.connect();
    this.subscribe(chatId);
  }

  subscribe(chatId: string) {

    if (this.websocketSubscription && this.websocketSubscription.has(chatId)) {
      console.log('already subscribed');
      return;
    }

    const websocketSubscription = this.stompService.subscribe('/topic/chat-' + chatId).subscribe((message: any) => {
      
      const newlySubscribed = this.websocketSubscription && !this.websocketSubscription.has(chatId);
      if (newlySubscribed) {
        this.sendUserConnectedMessage(chatId);
        return;
      }

      const msg: ChatMessage = JSON.parse(message.body);
      this.handleNewMessage(chatId, msg);
    });

    this.websocketSubscription.set(chatId, websocketSubscription);
  }

  public disconnectAndUnsubscribeFromAll(chatIds: string[]) {
    this.disconnect();
    chatIds.forEach(chatId => {
      this.unsubscribe(chatId);
    });
  }      

  public disconnect() {
    this.stompService.deactivate().then(() => {
      console.log('disconnect with existing websocket connection');
    });
  }

  public unsubscribe(chatId: string) {
    this.sendUserDisonnectedMessage(chatId);

    if (this.websocketSubscription && this.websocketSubscription.size > 0) {
      this.websocketSubscription.forEach((subscription: any) => {
        subscription.unsubscribe();
      });
    }
  }        


  private stompConfig(): StompConfig {
    const wsStompEndpoint = `${this.apiUrl}/websocket-connection`;
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
    this.newMessageSubject.next({chatId, message: msg});
  }

  public async loadMessages(chatId: string) {
    const chatName = await this.userService.getChatName(chatId);
    const messages = await this.storageService.loadMessages(chatId, chatName + "");
    if (messages) {
      this.messagesSubject.next({chatId, messages});
    }

    this.connectAndSubscribe(chatId);
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
