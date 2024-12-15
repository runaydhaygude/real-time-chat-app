import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatLayoutComponent } from './chat-layout/chat-layout.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatMenuComponent } from './chat-menu/chat-menu.component';
import { StompRService } from '@stomp/ng2-stompjs';
import { ChatInputComponent } from './chat-thread/chat-input/chat-input.component';
import { ChatMessageComponent } from './chat-thread/chat-message/chat-message.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChatLayoutComponent,
    ChatThreadComponent,
    ChatMenuComponent,
    ChatInputComponent,
    ChatMessageComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule
  ],
  providers: [
    StompRService
  ]
})
export class ChatModule { }
