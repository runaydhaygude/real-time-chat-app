import { Component } from '@angular/core';
import { UserService } from './chat/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-frontend';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.initialize();
  }
  

  async initialize() {
    this.userService.intializeUser();

    this.userService.intializeChatGroup();
  }
}
