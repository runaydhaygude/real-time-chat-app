import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { ChatLayoutComponent } from './chat-layout/chat-layout.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatMenuComponent } from './chat-menu/chat-menu.component';
import { StompRService } from '@stomp/ng2-stompjs';
import { ChatInputComponent } from './chat-thread/chat-input/chat-input.component';
import { ChatMessageComponent } from './chat-thread/chat-message/chat-message.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './shared/profile/profile.component';
import { ChatInfoComponent } from './shared/chat-info/chat-info.component';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';


@NgModule({
  declarations: [
    ChatLayoutComponent,
    ChatThreadComponent,
    ChatMenuComponent,
    ChatInputComponent,
    ChatMessageComponent,
    ProfileComponent,
    ChatInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    ClipboardModule
  ],
  providers: [
    StompRService
  ]
})
export class ChatModule { }
