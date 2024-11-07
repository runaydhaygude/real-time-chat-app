import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../services/message.service';
import { ChatMessage } from './chat-message/chat-message.interface';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.scss']
})
export class ChatThreadComponent {
  chatId!: string;

  userId!: string;

  messages: ChatMessage[] = [];


  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!this.chatId) {
        this.chatId = params['chatId'];
        this.userId = this.generateRandomId();
      }
    });

    this.messageService.getMessages().subscribe((newMessages: any[]) => {
      this.messages = newMessages;
    });

    this.messageService.newMessageReceived().subscribe(msg => {
      if (msg) {
        console.log('new message', msg);
        this.messages.unshift(msg);
      }
      
    });
  }

  ngAfterViewInit() {
    this.messageService.loadMessages(this.chatId);
  }

  sendMessage(content: string) {
    const message: ChatMessage = { senderId: this.userId, content };
    this.messageService.sendMessage(this.chatId, message);
  }

  clearChat() {
    this.messageService.clearChat(this.chatId);
  }

  generateRandomId(): string {
    // Generate a random number between 0 and 99999
    const randomNumber = Math.floor(Math.random() * 100000);
    // Convert to string and pad with leading zeros if necessary
    return randomNumber.toString().padStart(5, '0');
}

}
