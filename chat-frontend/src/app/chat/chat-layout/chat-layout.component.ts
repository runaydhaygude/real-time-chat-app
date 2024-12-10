import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.scss']
})
export class ChatLayoutComponent {
  constructor() {
    console.log('layout const service initialized');
  }

  ngOnInit() {
    console.log('layout ngonit service initialized');
  }

  ngAfterViewInit() {
    console.log('layout afterview service initialized');
  }
}
