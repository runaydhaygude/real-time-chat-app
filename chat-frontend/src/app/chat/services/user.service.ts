import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../shared/profile/profile.component';
import { ChatGroup } from '../helper/interfaces/chat-group.interface';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { ChatInfoComponent } from '../shared/chat-info/chat-info.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentChatId = new BehaviorSubject<any>(null);
  private _user = new BehaviorSubject<any>(null);

  constructor(
    private storageService: StorageService,
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router
  ) { }


  getCurrentChatId() {
    return this._currentChatId.asObservable();
  }

  getUserUpdate() {
    return this._user.asObservable();
  }

  async getUser() {
    return this.storageService.getUser();
  }

  async getChatGroups() {
    return await this.storageService.getChatGroups();
  }

  async intializeUser() {
    const user = await this.storageService.getUser();
    if (user) {
      this._user.next(user);
     return;
    }

    this.openUserNamePopup(this.createUser.bind(this));
  }

  async intializeChatGroup() {
    const chatGroups = await this.storageService.getChatGroups();
    if (chatGroups && chatGroups.length > 0) {
      await this.redirectToChat(chatGroups[0]?.chatId);
      return chatGroups;
    }

    const DEFAULT_CHAT_NAME = 'Default Chat';
    await this.createNewChat(DEFAULT_CHAT_NAME);
    return null;
  }
  
  async createNewChat(chatName: string) {
    const newChatGroup = await this.createChatGroup(chatName);
    await this.storageService.addNewChatGroup(newChatGroup.chatId, newChatGroup.chatName + "");
    this.redirectToChat(newChatGroup.chatId);
  }
  
  async deleteChatGroup(chatId: string) {
    await this.storageService.deleteChatGroup(chatId);

    const nextChatId = (await this.getChatGroups())[0]?.chatId;
    if (nextChatId) {
      this.redirectToChat(nextChatId);
    } else {
      this.intializeChatGroup();
    }
  }

  async redirectToChat(chatId: string) {
    this._currentChatId.next(chatId);
    this.router.navigate(['/chat', chatId]);
  }

  async getChatGroupAndRedirect(chatId: string) {
    const allChatGroups: any[] = await this.storageService.getChatGroups();
    const chatGroupExistsInLocalDb: boolean = allChatGroups &&
      allChatGroups.length > 0 &&
      allChatGroups.filter(chatGroup => chatGroup.chatId === chatId).length > 0;

      if (!chatGroupExistsInLocalDb) {
        const chatGroupFromBackend = await this.getChatGroup(chatId);
        await this.storageService.addNewChatGroup(chatGroupFromBackend.chatId, chatGroupFromBackend.chatName + "");
      }

      this.redirectToChat(chatId);
  }

  async updateUser(sendUserNameUpdateMessage: (chatId: string, userName: string) => any) {
    this.openUserNamePopup(this.updateUserName.bind(this), sendUserNameUpdateMessage);
  }

  async updateUserName(userName: string) {
    const currentUserState = await this.storageService.getUser();
    if (currentUserState?.userId) {
      this.apiService.updateUser(currentUserState.userId, userName).subscribe(user => {
          this.storageService.updateUser(currentUserState.userId, user.userName);
          this._user.next(user);
      });
    }
  }

  async openUserNamePopup(updateUserName: (userName: string) => any,
  sendUserNameUpdateMessage?: (chatId: string, userName: string) => any) {

    const dialogRef = this.dialog.open(ProfileComponent, {
      panelClass: 'custom-dialog-container', // Optional: Add custom styling
    });

    dialogRef.afterClosed().subscribe((userName) => {
      if (userName) {
        updateUserName(userName);
        if (sendUserNameUpdateMessage) {
          sendUserNameUpdateMessage(this._currentChatId.value, userName);
        }
      }
    });
  }


  async newChat() {
    this.openChatGroupPopup(this.getChatGroupAndRedirect.bind(this), this.createNewChat.bind(this));
  }

  async openChatGroupPopup(getChatGroupAndRedirect: (chatId: string) => any,
  createNewChat: (chatName: string) => any) {

    const dialogRef = this.dialog.open(ChatInfoComponent, {
      panelClass: 'custom-dialog-container', // Optional: Add custom styling
    });

    dialogRef.afterClosed().subscribe((chatGroup: any) => {
      if (chatGroup && chatGroup.chatId) {
        getChatGroupAndRedirect(chatGroup.chatId);
      } else if (chatGroup && chatGroup.chatName) {
        createNewChat(chatGroup.chatName);
      }
    });
  }

   async createUser(userName: string) {
    this.apiService.createUser(userName).subscribe(user => {
      this.storageService.addUser(user.userId, user.userName);
      this._user.next(user);
    });
  }

  async createChatGroup(chatName: string) {
    return await firstValueFrom(this.apiService.createChatGroup(chatName));
  }


  async setupChatGroup(chatId: string) {
    const chatGroup = await this.storageService.getChatGroup(chatId);
    if (chatGroup && chatGroup.chatName) {
      return chatGroup.chatName;
    }

    const chatGroupFromBackend = await this.getChatGroup(chatId);
    if (!chatGroupFromBackend) {
      this.intializeChatGroup();
      return;
    }

    await this.storageService.addNewChatGroup(chatGroupFromBackend.chatId, chatGroupFromBackend.chatName + "");
    return chatGroupFromBackend.chatName;
  }

  async getChatName(chatId: string) {
    const chatGroup = await this.getChatGroup(chatId);
    return chatGroup.chatName;
  }

  async getChatGroup(chatId: string) {
    const chatGroup = await firstValueFrom(this.apiService.getChatGroup(chatId));
    if (chatGroup && !chatGroup.chatId) {
      return await firstValueFrom(this.apiService.createChatGroupUsingChatId(chatId));
    }

    return chatGroup;
  }
}
