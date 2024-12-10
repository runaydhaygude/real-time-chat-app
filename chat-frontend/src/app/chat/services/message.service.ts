import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

import * as SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';
import { RxStompService, StompConfig, StompRService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { ChatMessage } from '../helper/interfaces/chat-message.interface';
import { ConfigService } from 'src/app/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messagesSubject = new BehaviorSubject<any[]>([]);
  private newMessageSubject = new BehaviorSubject<any>(null);

  constructor(
    private storageService: StorageService,
    private stompService: StompRService,
    private configService: ConfigService) {}


  private init(chatId: string): void {
    if (!this.stompService.connected()) {
      // this.clearChat(chatId);
      this.stompService.config = this.stompConfig();

      this.stompService.initAndConnect();

      this.stompService.subscribe('/ws/topic/chat/' + chatId).subscribe((message: any) => {
        const msg: ChatMessage = JSON.parse(message.body);
        this.handleNewMessage(chatId, msg);
      });
    }
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

  public async loadMessages(chatId: string) {
    const messages = await this.storageService.loadMessages(chatId);
    if (messages) {
      this.messagesSubject.next(messages);
    }

    this.init(chatId);
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

  public clearChat(chatId: string) {
    this.storageService.clearMessages(chatId);
    this.loadMessages(chatId);
  }
}
