import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  headers: HttpHeaders;
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.herokuappUrl;
  }

  getService(ruta: string, headers?: HttpHeaders) {
    if (headers) { this.headers = headers; }
    return this.http.get(this.url + ruta, { headers: this.headers });
  }
}
