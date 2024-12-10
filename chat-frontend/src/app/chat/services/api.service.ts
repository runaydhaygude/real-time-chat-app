import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { ChatUser } from '../helper/interfaces/chat-user.interface';
import { ConfigService } from 'src/app/services/config.service';
import { ChatGroup } from '../helper/interfaces/chat-group.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = 'http://localhost:8081/rest';
  contextPath: string = '/rest';

  constructor(private http: HttpClient,
    private configService: ConfigService
  ) {
    // this.apiUrl = `${this.configService.apiHost}${this.contextPath}`;
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

    return this.http.post<ChatUser>(`${this.apiUrl}/user/create`, { userName }).pipe(
      catchError(this.handleError)
    );
  }

  createChatGroup(): Observable<ChatGroup> {


    return this.http.post<ChatGroup>(`${this.apiUrl}/chat-group/create`, {}).pipe(
      catchError(this.handleError)
    );
  }
}
