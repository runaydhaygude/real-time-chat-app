import { Component } from '@angular/core';
import { StorageService } from './chat/services/storage.service';
import { ApiService } from './chat/services/api.service';
import { UserService } from './chat/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-frontend';

  constructor(private userService: UserService) {
    this.userService.intializeUser();
  }

  
}
