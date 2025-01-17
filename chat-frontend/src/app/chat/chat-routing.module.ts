import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatLayoutComponent } from './chat-layout/chat-layout.component';
import { ChatMenuComponent } from './chat-menu/chat-menu.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';

const routes: Routes = [
  {
    path: 'chat',
    component: ChatLayoutComponent,
    children: [
      { path: ':chatId', component: ChatThreadComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
