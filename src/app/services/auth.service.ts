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

  constructor(private fireAuth: AngularFireAuth, 
    private http: HttpClient) { }

    login(email: string, password: string) {
      return new Promise<any>((resolve, reject) => {
        this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }

    logout() {
      return new Promise<any>((resolve, reject) => {
        this.fireAuth.auth.signOut()
        .then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }

    getRoles(): string[] {
      return ['EXPLORER', 'MANAGER', 'ADMINISTRATOR'];
    }
}
