import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: any;

  constructor(private http: HttpClient) {}

  // Method to load the configuration
  loadConfig(): Observable<any> {
    return this.http.get('/assets/config.json');
  }

  // Method to get the API host
  get apiHost(): string {
    return 'http://localhost:8080'; // window.location.origin;
  }

  // Method to set the configuration
  setConfig(config: any) {
    this.config = config;
  }
}
