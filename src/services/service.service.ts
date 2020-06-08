import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Service } from 'src/models/service.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Response } from 'src/models/response.model';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private headers: HttpHeaders;
  private _serviceSubject: Subject<Array<Service>>;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    this._serviceSubject = new Subject<Array<Service>>();

      // Création de l'entête des requêtes HTTP
      this.headers = new HttpHeaders({
        username: this.authService.username,
        token: this.authService.token
      });
  }

  public get serviceSubject(): Subject<Array<Service>> {
    return this._serviceSubject;
  }

  public fetchServices(name?: string): Promise<Response> {
    return new Promise<Response>(
      (resolve, reject) => {
        // Appel de l'API
        let services = [];
        this.httpClient.get('https://78.112.250.27:5000/api/v1/services', {
          headers: this.headers
        })
          .subscribe(
            (response: Response) => {
              services = response.services;
              // Renvoi des services via le sujet
              this._serviceSubject.next(services);
              resolve(response);
            },
            (error: HttpErrorResponse) => {
              console.log(error.message)
              reject(error);
            }
          );
      }
    );
  }
}
