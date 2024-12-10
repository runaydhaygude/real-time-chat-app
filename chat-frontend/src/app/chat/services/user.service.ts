import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private storageService: StorageService,
    private apiService: ApiService
  ) { }


  async getUser() {
    return this.storageService.getUser();
  }

  async intializeUser() {
    const user = await this.storageService.getUser();
    if (!user) {
      const userName: any = '' + window.prompt("Please enter your name:");
      this.apiService.createUser(userName).subscribe(user => {
        this.storageService.addUser(user.userId, user.userName);
      });
    }
  }
}
