import { Component } from '@angular/core';
import { UserService } from './chat/services/user.service';
import { MessageService } from './chat/services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-frontend';

  constructor(private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initialize();
  }
  

  async initialize() {
    this.userService.intializeUser();

    const chatGroups = await this.userService.intializeChatGroup();
    const chatIds = chatGroups == null ? [] : chatGroups.map((chatGroup: any) => chatGroup.chatId);
    await this.messageService.connectAndSubscribeToAll(chatIds);
  }
}
