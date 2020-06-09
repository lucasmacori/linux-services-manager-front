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

  private url: string;
  private headers: HttpHeaders;
  private _serviceSubject: Subject<Array<Service>>;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    this._serviceSubject = new Subject<Array<Service>>();
    this.url = this.configService.URL;
  }

  public get serviceSubject(): Subject<Array<Service>> {
    return this._serviceSubject;
  }

  public fetchServices(name?: string, favorite: boolean = false): Promise<Response> {
    return new Promise<Response>(
      (resolve, reject) => {
        // Appel de l'API
        let services = [];
        const prefix = favorite ? '/favorite' : '';
        const nameQuery = name ? `/${name}` : ''
        this.httpClient.get(`${this.url}${prefix}/services${nameQuery}`, {
          headers: new HttpHeaders({
            username: this.authService.username,
            token: this.authService.token
          })
        })
          .subscribe(
            (response: Response) => {
              services = response.services;
              // Renvoi des services via le sujet
              this._serviceSubject.next(services);
              resolve(response);
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
      }
    );
  }

  public startService(name: string): Promise<Response> {
    return new Promise<Response>(
      (resolve, reject) => {
        // Appel de l'API
        this.httpClient.put(`${this.url}/service/${name}`,
        {},
        {
          headers: new HttpHeaders({
            username: this.authService.username,
            token: this.authService.token
          })
        })
          .subscribe(
            (response: Response) => {
              resolve(response);
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
      }
    );
  }

  public stopService(name: string): Promise<Response> {
    return new Promise<Response>(
      (resolve, reject) => {
        // Appel de l'API
        this.httpClient.delete(`${this.url}/service/${name}`, {
          headers: new HttpHeaders({
            username: this.authService.username,
            token: this.authService.token
          })
        })
          .subscribe(
            (response: Response) => {
              resolve(response);
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
      }
    );
  }

  public addFavoriteService(service: Service): Promise<Response> {
    return new Promise<Response>(
      (resolve, reject) => {
        // Appel de l'API
        this.httpClient.post(`${this.url}/favorite/services`,
        {
          name: service.name,
          serviceName: service.name
        },
        {
          headers: new HttpHeaders({
            username: this.authService.username,
            token: this.authService.token
          })
        })
          .subscribe(
            (response: Response) => {
              resolve(response);
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
      }
    );
  }

  public deleteFavoriteService(service: Service): Promise<Response> {
    return new Promise<Response>(
      (resolve, reject) => {
        // Appel de l'API
        this.httpClient.delete(`${this.url}/favorite/services/${service.name}`,
        {
          headers: new HttpHeaders({
            username: this.authService.username,
            token: this.authService.token
          })
        })
          .subscribe(
            (response: Response) => {
              resolve(response);
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
      }
    );
  }
}
