import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from 'src/models/response.model';
import { ConfigService } from './config.service';
import { CommunicationService } from './communication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string;
  private _isLoggedIn: boolean
  private _username: string;
  private _token: string;

  constructor(
    private communicationService: CommunicationService,
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    this.loadSession();
    this.url = this.configService.URL;
  }

  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  public get username(): string {
    return this._username;
  }

  public get token(): string {
    return this._token;
  }

  public login(username: string, password: string): Promise<Response> {
    return new Promise<Response>(
      (resolve, reject) => {
        this.httpClient.post(`${this.url}/login`, {
          username, password
        })
          .subscribe(
            (response: Response) => {
              this._username = username;
              this._token = response.token;
              this.saveSession()
              this._isLoggedIn = true;
              resolve(response);
            },
            (error: HttpErrorResponse) => {
              this.communicationService.showError(error.error.message);
              reject(error)
            }
          );
      }
    );
  }

  public logout(): void {
    localStorage.removeItem('auth');
    this._username = undefined;
    this._token = undefined;
    this._isLoggedIn = false;
  }

  private loadSession(): void {
    try {
      const raw_auth = localStorage.getItem('auth');
      if (raw_auth) {
        const auth = JSON.parse(raw_auth);
        if (auth.username && auth.token) {
          this._username = auth.username;
          this._token = auth.token;
          this._isLoggedIn = true;
        } else {
          this._isLoggedIn = false;
        }
      }
    } catch {
      this._isLoggedIn = false;
    }
    
  }

  private saveSession(): void {
    localStorage.setItem('auth', JSON.stringify({
      username: this._username,
      token: this._token
    }));
  }
}
