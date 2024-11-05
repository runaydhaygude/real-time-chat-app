import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

import * as SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';
import { RxStompService, StompConfig, StompRService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private stompClient: any;
  private messagesSubject = new BehaviorSubject<any[]>([]);
  private newMessageSubject = new BehaviorSubject<any>(null);

  constructor(private storageService: StorageService, private stompService: StompRService) {
    this.init();
  }


  private init(): void {
    if (!this.stompService.connected()) {
      this.stompService.config = this.stompConfig();

      this.stompService.initAndConnect();

      this.stompService.subscribe('/topic/guest-chats').subscribe((message: any) => {
        console.log('runay ', message);
        const msg = JSON.parse(message.body);
        this.handleNewMessage(msg);
      });
    }
  }


  private stompConfig(): StompConfig {
    const provider = function() {
      return new SockJS('http://localhost:8081/runay-chat-app');
    };

    const config = new StompConfig();
    config.url = provider;
    config.heartbeat_in = 0;
    config.heartbeat_out = 0;
    config.reconnect_delay = 10000;

    return config;
  }


  // private connectWebSocket() {
  //   const socket = new SockJS('http://localhost:8081/runay-chat-app');
  //   this.stompClient = Stomp.over(socket);

  //   this.stompClient.connect({}, (frame: string) => {
  //     console.log('Connected: ' + frame);
  //     this.stompClient.subscribe('/topic/guest-chats', (message: any) => {
  //       const msg = JSON.parse(message.content);
  //       this.handleNewMessage(msg);
  //     });
  //   }, (error: string) => {
  //     console.error('Connection error: ' + error);
  //   });
  // }

  private async handleNewMessage(msg: any) {
    await this.storageService.storeMessage(msg);
    this.newMessageSubject.next(msg);
  }

  public async loadMessages() {
    const messages = await this.storageService.loadMessages();
    this.messagesSubject.next(messages);
  }

  getMessages() {
    return this.messagesSubject.asObservable();
  }

  newMessageReceived() {
    return this.newMessageSubject.asObservable();
  }

  public sendMessage(message: any) {
    this.stompService.publish('/app/guest-chat', JSON.stringify(message));
  }

  public clearChat() {
    this.storageService.clearMessages();
  }
}
