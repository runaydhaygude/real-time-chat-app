import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Subscription } from 'rxjs';
import { MessageService } from '../services/message.service';
import { ChatUser } from '../helper/interfaces/chat-user.interface';

@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.scss']
})
export class ChatMenuComponent {

  chats: any[] = []
  chatIdSelected: string | null = null;
  chatIdSubscription: Subscription = undefined as any;

  user: ChatUser = { userId: 'default', userName: 'Create User'};
  userUpdateSubscription: Subscription = undefined as any;

  constructor(public userService: UserService,
    private messageService: MessageService,
    private clipboard: Clipboard
  ) {
  }

  ngOnInit() {
    this.chatIdSubscription = this.userService.getCurrentChatId().subscribe(chatId => {
      if (chatId) {
        this.chatIdSelected = chatId;
        this.getChatGroups();
      }
    });

    this.userUpdateSubscription = this.userService.getUserUpdate().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnDestroy() {
    if (this.chatIdSubscription) {
      this.chatIdSubscription.unsubscribe();
    }
  }


  async getChatGroups() {
    this.chats = await this.userService.getChatGroups();
  }

  openChat(chatId: string) {
    this.userService.redirectToChat(chatId);
    this.chatIdSelected = chatId;
  }

  newChat() {
    this.userService.newChat();
  }

  async updateProfile() {
    this.userService.updateUser(this.sendUserNameUpdate.bind(this));
  }

  sendUserNameUpdate(chatId: string, userName: string) {
    this.messageService.sendUserNameChangedMessage(chatId, userName);
  }

  deleteChat(chatId: string) {
    this.userService.deleteChatGroup(chatId);
  }

  async createChatGroup(chatName: string) {
    const chatGroup = await this.userService.createChatGroup(chatName);
    this.chats.push(chatGroup);
  }

  copyChatIdToClipboard(chatId: string) {
    this.clipboard.copy(chatId);
  }
}
