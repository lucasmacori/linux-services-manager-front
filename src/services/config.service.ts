import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _URL: string;
  private _HEADERS: any;

  constructor(
    private injector: Injector
  ) {
    this._URL = 'https://78.112.250.27:5000/api/v1';
    this._HEADERS = { 'Content-Type': 'application/json' };
  }

  public get URL(): string {
    return this._URL;
  }

  public get HEADERS(): any {
    return this._HEADERS;
  }
}
