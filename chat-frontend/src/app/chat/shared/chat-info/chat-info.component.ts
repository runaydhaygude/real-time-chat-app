import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent {

  chatId: string = '';
  chatName: string = '';


  constructor(private dialogRef: MatDialogRef<ChatInfoComponent>) { }

  submit(): void {
    this.dialogRef.close({ chatId: this.chatId.trim(), chatName: this.chatName.trim() });
  }
}
