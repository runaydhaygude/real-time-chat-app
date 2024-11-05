import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatLayoutComponent } from './chat-layout/chat-layout.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { StompRService } from '@stomp/ng2-stompjs';


@NgModule({
  declarations: [
    ChatLayoutComponent,
    ChatThreadComponent,
    ChatHistoryComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ],
  providers: [
    StompRService
  ]
})
export class ChatModule { }
