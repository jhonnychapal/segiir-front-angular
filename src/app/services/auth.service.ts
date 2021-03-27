import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  
  requestReset(body:any): Observable<any> {
    return this.http.post(`${base_url}/login/req-reset-password`, body);
  }
  
  newPassword(body:any): Observable<any> {
    return this.http.post(`${base_url}/login/new-password`, body);
  }
  
  ValidPasswordToken(body:any): Observable<any> {
    return this.http.post(`${base_url}/login/valid-password-token`, body);
  }
}


