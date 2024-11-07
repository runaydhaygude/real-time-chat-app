import { Injectable } from '@angular/core';

import { openDB } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private dbPromise = openDB('ChatDB', 1, {
    upgrade(db) {
      db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
    }
  });

  async storeMessage(chatId: string, msg: any) {
    const db = await this.dbPromise;
    await db.add('messages', { content: msg.content, timestamp: new Date() });
  }

  async loadMessages(chatId: string) {
    const db = await this.dbPromise;
    return await db.getAll('messages');
  }

  async clearMessages(chatId:string) {
    const db = await this.dbPromise;
    await db.transaction('messages', 'readwrite').objectStore('messages').clear();
  }
}
