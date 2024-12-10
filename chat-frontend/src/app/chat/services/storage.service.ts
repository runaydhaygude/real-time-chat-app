import { Injectable } from '@angular/core';

import { IDBPDatabase, openDB } from 'idb';
import { ChatDB } from '../helper/interfaces/chat-db.interface';
import { ChatMessage } from '../helper/interfaces/chat-message.interface';
import { ChatUser } from '../helper/interfaces/chat-user.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private dbVersion: number = 1;
  private dbPromise: Promise<IDBPDatabase<ChatDB>>;

  constructor() {
    this.dbPromise = this.openDatabase();
    console.log('Storage service initialized');
  }

  private async openDatabase(): Promise<IDBPDatabase<ChatDB>> {

    return openDB<ChatDB>('ChatDB', this.dbVersion, {
      upgrade(db) {

        if (!db.objectStoreNames.contains('ChatGroups')) {
          db.createObjectStore('ChatGroups', { keyPath: 'chatId'});
        }
        
        if (!db.objectStoreNames.contains('Users')) {
          db.createObjectStore('Users', { keyPath: 'userId'});
        }
      }
    });
  }

  private async deleteDatabase() {
    await indexedDB.deleteDatabase('ChatDB');
  }

  // Method to add a user
  async addUser(userId: string, userName: string) {
    const db = await this.dbPromise;
    const users = await db.getAllKeys('Users');

    if (users && users.length > 0) {
      return;
    }
    
    await db.add('Users', { userId, userName });
  }

  async updateUser(userId: string, userName: string) {
    const db = await this.dbPromise;
    await db.put('Users', { userId, userName });
  }

  async getUser() {
    const db = await this.dbPromise;
    const users = await db.getAllKeys('Users');
    if (!users || users.length === 0) {
      return null;
    }

    const user = await db.get('Users', users[0]);
    return user;
  }

  async storeMessage(chatId: string, msg: ChatMessage) {
    const db = await this.dbPromise;
    const chatGroup = await db.get('ChatGroups', chatId);

    if (chatGroup) {
      chatGroup.messages.push(msg);
      await db.put('ChatGroups', chatGroup);
    } else {
      await db.add('ChatGroups', { chatId, messages: [msg] });
    }
  }

  async loadMessages(chatId: string) {
    const db = await this.dbPromise;

    const chatGroup = await db.get('ChatGroups', chatId);

    if (!chatGroup) {
      await db.add('ChatGroups', { chatId, messages: [] });
    }

    return await db.get('ChatGroups', chatId).then(chatGroup => chatGroup?.messages);;
  }

  async clearMessages(chatId:string) {
    
    const db = await this.dbPromise;
    const chatGroup = await db.get('ChatGroups', chatId);

    if (chatGroup) {
      chatGroup.messages = [];
      await db.put('ChatGroups', chatGroup);
    }
  }

  async clearAllChatGroups() {
    const db = await this.dbPromise;
    await db.transaction('ChatGroups', 'readwrite').objectStore('ChatGroups').clear();
  }
}



/**
 *  private dbVersion: number = 1;
  private db: IDBPDatabase<ChatDB> | undefined;

  private async openDatabase(): Promise<void> {
    try {
      this.db = await openDB<ChatDB>(CHAT_DB, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('ChatGroups')) {
            db.createObjectStore('ChatGroups', { keyPath: 'chatId' });
          }
        },
      });
    } catch (error) {
      console.error('Error opening IndexedDB:', error);
    }
  }

  private getTransaction(mode: 'readonly' | 'readwrite'): IDBPObjectStore<ChatDB> {
    if (!this.db) {
      throw new Error('Database not initialized.');
    }
    const transaction: IDBPTransaction<ChatDB, ['ChatGroups'], typeof mode> = this.db.transaction('ChatGroups', mode);
    return transaction.objectStore('ChatGroups');
  }

  // Method to check if a chat group exists by chat-id (using 'readonly' mode)
  async checkIfChatGroupExists(chatId: string): Promise<boolean> {
    const store = this.getTransaction( 'readonly');
    const chatGroup = await store.get(chatId);
    return chatGroup !== undefined;  // If the result is undefined, it means the chat group does not exist.
  }

  // Method to add a message to the chat group (using 'readwrite' mode)
  async addMessageToChatGroup(chatId: string, message: ChatMessage): Promise<void> {
    const store = this.getTransaction( 'readwrite');
    const chatGroup = await store.get(chatId);


    if (chatGroup) {
      chatGroup.messages.push(message);
      if (store !== undefined) {
        await store.put(chatGroup); // Update the existing chat group
      }
    } else {
      const newChatGroup = { chatId, messages: [message] };
      if (store) {
        await store?.add(newChatGroup); // Add a new chat group
    }
  }

  async storeMessage(chatId: string, msg: any) {
    const db = await this.dbPromise;
    await db.add(CHAT_GROUPS, { content: msg.content, timestamp: new Date() });
  }

  async loadMessages(chatId: string) {
    const db = await this.dbPromise;
    return await db.getAll('messages');
  }

  async clearMessages(chatId:string) {
    const db = await this.dbPromise;
    await db.transaction('messages', 'readwrite').objectStore('messages').clear();
  }
 */