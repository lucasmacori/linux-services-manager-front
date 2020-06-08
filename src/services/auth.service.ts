import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from 'src/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn: boolean
  private _username: string;
  private _token: string;

  constructor(private httpClient: HttpClient) {
    this.loadSession();
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

  public login(username: string, password: string): void {
    this.httpClient.post('https://78.112.250.27:5000/api/v1/login', {
      username, password
    })
      .subscribe(
        (response: Response) => {
          this.saveSession(username, response.token)
          this._isLoggedIn = true;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
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

  private saveSession(username: string, token: string): void {
    this._username = username;
    this._token = token;
    localStorage.setItem('auth', JSON.stringify({
      username, token
    }));
  }
}
