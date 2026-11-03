import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID, signal, Signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { checkPrimeSync } from 'node:crypto';
import { CheckPlatForm } from './check-plat-form';
import { json } from 'node:stream/consumers';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  userData = signal<User>({} as User);
  private readonly httpclient = inject(HttpClient);

  private readonly chekplatForm = inject(CheckPlatForm);
  private readonly router = inject(Router);
  constructor() {
    if (this.chekplatForm.isBrwoser()) {
      if (localStorage.getItem(`usertoken`)) {
        // this.userData.set(JSON.parse(localStorage.getItem(`userData`)!));
        const savedUser = localStorage.getItem('userData');
        if (savedUser) {
          this.userData.set(JSON.parse(savedUser));
        }
        this.router.navigate([`/feed`]);
        // this.userData.set(JSON.parse(localStorage.getItem(`userData`)!));
        // this.userData.set(localStorage.getItem(`userData`));
      } else {
        this.router.navigate([`/register`]);
      }
    }
  }

  signUp(data: Object): Observable<any> {
    return this.httpclient.post(`${environment.baseURL}/users/signup`, data);
  }
  signIn(data: Object): Observable<any> {
     return this.httpclient.post(`${environment.baseURLLogin}/users/signin`, data);
  }
  // getposts(): Observable<any> {
  //   const token = localStorage.getItem('usertoken') || '';
  //   const headers = new HttpHeaders().set('token', token);

  //   return this.httpclient.get(`${environment.baseURL}/posts`, { headers });
  // }
  getSuggFriends():Observable<any>{
   return this.httpclient.get(`${environment.baseURL}/users/suggestions?limit=10`, {
     headers: { Authorization: 'Bearer ' + localStorage.getItem('usertoken')},
   });
  }
}
 