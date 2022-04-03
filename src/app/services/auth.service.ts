import { Injectable } from '@angular/core';
import { Actor } from '../models/actor.model';
import { AngularFireAuth } from 'angularfire2/auth';

import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { resolve } from 'url';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth , private http: HttpClient) { }

    login(email: string, password: string) {
      // tslint:disable-next-line:no-shadowed-variable
      return new Promise<any>((resolve, reject) => {
        this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      });
    }

    logout() {
      // tslint:disable-next-line:no-shadowed-variable
      return new Promise<any>((resolve, reject) => {
        this.fireAuth.auth.signOut()
        .then(res => {
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      });
    }

    getRoles(): string[] {
      return ['EXPLORER', 'MANAGER', 'ADMINISTRATOR'];
    }

    registerUser(actor: Actor) {
      // tslint:disable-next-line:no-shadowed-variable
      return new Promise<any>((resolve, reject) => {
        this.fireAuth.auth.createUserWithEmailAndPassword(actor.email, actor.password)
        .then(_ => {
          const url = `${environment.json_server_baseURL + '/actors'}`;
          const body = JSON.stringify(actor);
          this.http.post(url, body, httpOptions).toPromise()
          .then(res => {
            resolve(res);
          }, err => {
            reject(err);
          });
        }).catch(error => {
          reject(error);
        });
      });
    }
}
