import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.scss']
})
export class ChatThreadComponent {
  // chatId!: number;
  messages: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.chatId = +params['id'];
    // });

    this.messageService.getMessages().subscribe((newMessages: any[]) => {
      this.messages = newMessages;
    });

    this.messageService.newMessageReceived().subscribe(msg => {
      if (msg) {
        console.log('new message', msg);
        this.messages.push(msg); // Append new message
      }
      
    });
  }

  sendMessage(content: string) {
    const message = { message: content };
    this.messageService.sendMessage(message);
  }

  clearChat() {
    this.messageService.clearChat();
  }

  ngAfterViewInit() {
    this.messageService.loadMessages();
  }
}
