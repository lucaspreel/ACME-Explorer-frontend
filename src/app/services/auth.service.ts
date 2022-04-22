import { Injectable } from '@angular/core';
import { Actor } from '../models/actor.model';
import { AngularFireAuth } from 'angularfire2/auth';

import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { resolve } from 'url';
import { Subject } from 'rxjs';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentActor: Actor;
  userLoggedIn = new Subject();

  constructor(private fireAuth: AngularFireAuth, private http: HttpClient, private messageService: MessageService) {

  }

    login(email: string, password: string) {
      return new Promise<any>((resolve, reject) => {
        this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(_ => {
          const url = environment.json_server_baseURL + '/actors?email=' + email;
          this.http.get<Actor[]>(url).toPromise()
          .then((actor: Actor[]) => {
            this.currentActor = actor[0];
            this.userLoggedIn.next(true);
            this.messageService.notifyMessage('messages.auth.login.correct', 'alert alert-primary');
            resolve(this.currentActor);
          }).catch(error => {
            this.messageService.notifyMessage('errorMessages.auth.login.failed', 'alert alert-danger');
            reject(error);
          });
        }).catch(error => {
          this.messageService.notifyMessage('errorMessages.' + error.code.replace(/\//gi, '.').replace(/\-/gi, '.'), 'alert alert-danger');
          reject(error);
        });
      });
    }

    logout() {
      return new Promise<any>((resolve, reject) => {
        this.fireAuth.auth.signOut()
        .then(res => {
          this.messageService.notifyMessage('messages.auth.logout.correct', 'alert alert-primary');
          resolve(res);
        }).catch(error => {
          this.messageService.notifyMessage('errorMessages.auth.logout.failed', 'alert alert-danger');
          reject(error);
        });
      });
    }

    getRoles(): string[] {
      return ['EXPLORER', 'MANAGER', 'ADMINISTRATOR', 'SPONSOR'];
    }

    getCurrentActor() {
      return this.currentActor;
    }

    registerUser(actor: Actor) {
      return new Promise<any>((resolve, reject) => {
        this.fireAuth.auth.createUserWithEmailAndPassword(actor.email, actor.password)
        .then(_ => {
          const url = `${environment.json_server_baseURL + '/actors'}`;
          const body = JSON.stringify(actor);
          this.http.post(url, body, httpOptions).toPromise()
          .then(res => {
            this.messageService.notifyMessage('messages.auth.registration.correct', 'alert alert-primary');
            resolve(res);
          }, err => {
            this.messageService.notifyMessage('errorMessages.auth.registration.failed', 'alert alert-danger');
            reject(err);
          });
        }).catch(error => {
          this.messageService.notifyMessage('errorMessages.' + error.code.replace(/\//gi, '.').replace(/\-/gi, '.'), 'alert alert-danger');
          reject(error);
        });
      });
    }
}
