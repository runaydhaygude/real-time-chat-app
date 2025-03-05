import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { ChatUser } from '../helper/interfaces/chat-user.interface';
import { ConfigService } from 'src/app/services/config.service';
import { ChatGroup } from '../helper/interfaces/chat-group.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = 'http://localhost:8081/rest';
  contextPath: string = '/rest';

  constructor(private http: HttpClient,
    private configService: ConfigService
  ) {
    this.apiUrl = `${this.configService.apiHost}${this.contextPath}`;
  }

  // Handling error response
  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      console.error('Bad request error:', error.message);
    } else if (error.status === 404) {
      console.error('Resource not found:', error.message);
    }
    // Handle other status codes similarly
    return throwError(error);
  }

  // Create a new user
  createUser(userName: string): Observable<ChatUser> {
    const chatId = uuidv4();
    return this.http.post<ChatUser>(`${this.apiUrl}/user/${chatId}`, { user_name: userName })
    .pipe(
      map((response: any) => ({
        userId: response.user_id,
        userName: response.user_name
      })),
      catchError(this.handleError)
    );
  }

  updateUser(chatId:string, userName: string): Observable<ChatUser> {
    return this.http.put<ChatUser>(`${this.apiUrl}/user/${chatId}`, { user_name: userName })
    .pipe(
      map((response: any) => ({
        userId: response.user_id,
        userName: response.user_name
      })),
      catchError(this.handleError)
    );
  }

  createChatGroup(chatName: string): Observable<ChatGroup> {
    const groupId = uuidv4();
    return this.http.post<ChatGroup>(`${this.apiUrl}/chat-group/${groupId}`, { chat_name: chatName })
    .pipe(
      map((response: any) => ({
        chatId: response.chat_id,
        chatName: response.chat_name
      })),
      catchError(this.handleError)
    );
  }

  createChatGroupUsingChatId(chatId: string): Observable<ChatGroup> {
    return this.http.post<ChatGroup>(`${this.apiUrl}/chat-group/${chatId}`, { chat_name: 'Default Chat' })
    .pipe(
      map((response: any) => ({
        chatId: response.chat_id,
        chatName: response.chat_name
      })),
      catchError(this.handleError)
    );
  }

  getChatGroup(chatId: string): Observable<ChatGroup> {
    return this.http.get<ChatGroup>(`${this.apiUrl}/chat-group/${chatId}`)
    .pipe(
      map((response: any) => {
        if (!response) {
          return {
            chatId: null,
            chatName: null
          }
        }
        return {
          chatId: response.chat_id,
          chatName: response.chat_name
        };
      }),
      catchError(this.handleError)
    );
  }
}
