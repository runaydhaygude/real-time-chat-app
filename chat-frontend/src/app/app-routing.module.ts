import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatLayoutComponent } from './chat/chat-layout/chat-layout.component';
import { ChatThreadComponent } from './chat/chat-thread/chat-thread.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', component: AppComponent }, // Keep AppComponent to handle redirection
  { path: 'chat', component: ChatLayoutComponent, children: [
      { path: ':chatId', component: ChatThreadComponent, runGuardsAndResolvers: 'always' }
    ] 
  },
  { path: '**', redirectTo: '/chat/:chatId' } // Redirect to home so AppComponent logic can take over
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
