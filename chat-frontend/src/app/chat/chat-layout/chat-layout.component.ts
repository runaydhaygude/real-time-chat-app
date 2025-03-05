import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.scss']
})
export class ChatLayoutComponent {

  chatId: string | null = null;
  chatIdSubscription: Subscription = undefined as any;
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.chatIdSubscription = this.route.paramMap.subscribe(params => {
      this.chatId = params.get('chatId');
    });
  }

  ngOnDestroy() {
    if (this.chatIdSubscription) {
      this.chatIdSubscription.unsubscribe();
    }
  }
}
