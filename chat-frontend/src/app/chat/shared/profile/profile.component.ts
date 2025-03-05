import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  // @Output() userNameSubmitted = new EventEmitter<string>();
  userName: string = '';

  constructor(private dialogRef: MatDialogRef<ProfileComponent>,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.setUserName();
  }

  async setUserName() {
    const user = await this.userService.getUser();
    if (user && user.userName) {
      this.userName = user.userName;
    }
  }

  submitUserName(): void {
    if (this.userName.trim()) {
      // alert("username is " + this.userName);
      this.dialogRef.close(this.userName.trim());
    } else {
      alert('Please enter a valid name.');
    }
  }
}
