import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as CryptoJS from 'crypto-js';

/*
  Generated class for the WebServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebServiceProvider {
  servidor: string = "http://localhost/irapp/public";
  constructor(public http: HttpClient) {
    console.log('Hello WebServiceProvider Provider');
  }

  encryptAES(msg: string) {
    var base64result =  CryptoJS.AES.encrypt(msg, "LzlDiqCCvXJUQ8j3+CWh1LgMfPMiLuVfIOElqaZ0Zg0=");
    return base64result.toString();
  }
  getLogin(email: string, password: string) {
    return new Promise(resolve => {
      //this.http.get('assets/api.json')
      //this.http.get('https://randomuser.me/api/?results=10')
      let servidor: string = window.localStorage.getItem('url_server');
      let email_aes: string = btoa(this.encryptAES(email));
      let password_aes: string = btoa(this.encryptAES(password));
      console.log(servidor + "/api/login/"+email_aes+"/"+password_aes);
      this.http.get(servidor + "/api/login/"+email_aes+"/"+password_aes)
        .map(res => res)
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getData(requests: Request[]) {
    return new Promise(resolve => {
      let servidor: string = window.localStorage.getItem('url_server');
      let email: string = window.localStorage.getItem('email_server');
      let password: string = window.localStorage.getItem('password_server');
      let email_aes: string = btoa(this.encryptAES(email));
      let password_aes: string = btoa(this.encryptAES(password));
      console.log(servidor + "/api/ordenes");
      var data = JSON.stringify({
        email: email_aes,
        password: password_aes,
        datos: requests
      });
      console.log(data);
      this.http.post(servidor + "/api/ordenes", data
        , { headers: { 'Content-Type': 'application/json' } })
        .map(res => res)
        .subscribe(data => {
          resolve(data);
        });
    });
  }
}
