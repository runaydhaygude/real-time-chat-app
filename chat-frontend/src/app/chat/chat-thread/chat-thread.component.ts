import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../services/message.service';
import { ChatMessage } from '../helper/interfaces/chat-message.interface';
import { UserService } from '../services/user.service';
import { ChatUser } from '../helper/interfaces/chat-user.interface';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.scss']
})
export class ChatThreadComponent {
  chatId!: string;

  user!: ChatUser;

  messages: ChatMessage[] = [];


  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private userService: UserService
  ) {
    console.log('thread constructor service initialized');
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (!this.chatId) {
        this.chatId = params['chatId'];
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


    this.initializeUser();
  }

  ngAfterViewInit() {
    console.log('thread afterview service initialized');
    this.messageService.loadMessages(this.chatId);
  }

  async initializeUser() {
    const user = await this.userService.getUser();
    if (!user) {
      this.user = {
        userId: this.generateRandomId(),
        userName: 'Guest'
      }

      return;
    }

    this.user = user;
  }

  sendMessage(content: string) {
    const message: ChatMessage = { senderId: this.user.userId, senderName: this.user.userName, content };
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
