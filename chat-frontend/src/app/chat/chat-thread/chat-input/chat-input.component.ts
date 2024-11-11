import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {
  content: string = '';

  @Output() messageSent: EventEmitter<string> = new EventEmitter();

  sendMessage() {
    this.messageSent.emit(this.content);
    this.content = '';
  }
}
