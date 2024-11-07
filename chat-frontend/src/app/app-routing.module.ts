import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatLayoutComponent } from './chat/chat-layout/chat-layout.component';
import { ChatThreadComponent } from './chat/chat-thread/chat-thread.component';

const routes: Routes = [
  { path: '', redirectTo: '/chat/default', pathMatch: 'full' },
  { path: '**', redirectTo: '/chat/default' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
