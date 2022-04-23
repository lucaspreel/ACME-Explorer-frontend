import { Injectable } from '@angular/core';
import { Actor } from '../models/actor.model';
import { AngularFireAuth } from 'angularfire2/auth';

import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { resolve } from 'url';
import { Subject } from 'rxjs';
import { MessageService } from './message.service';
import RolesEnum from '../utils/roles_enum';

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
    if (this.getUserId !== undefined) {
      this.userLoggedIn.next(true);
    }
  }

  login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(_ => {
          const url = environment.json_server_baseURL + '/actors?email=' + email;
          this.http.get<Actor[]>(url).toPromise()
            .then((actor: Actor[]) => {
              this.currentActor = actor[0];
              localStorage.setItem('ACTOR_ID', this.currentActor.id);
              localStorage.setItem('ROLE', this.currentActor.role);
              localStorage.setItem('STATUS', 'LOGGED_IN');
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
          localStorage.clear();
          localStorage.setItem('STATUS', 'LOGGED_OUT');
          this.userLoggedIn.next(false);
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

  async getCurrentActor(): Promise<Actor> {
    console.log('Get current actor');
    if (this.currentActor == undefined) {
      let actorId = localStorage.getItem("ACTOR_ID");
      const url = environment.json_server_baseURL + '/actors?id=' + actorId;
      this.http.get<Actor[]>(url).toPromise()
        .then((actor: Actor[]) => {
          this.currentActor = actor[0];
          this.userLoggedIn.next(true);
        }).catch(error => {
          this.messageService.notifyMessage('errorMessages.auth.login.failed', 'alert alert-danger');
        });
    }
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

  checkRole(roles: string): boolean {
    let result = false;
    let userRole = localStorage.getItem('ROLE');
    if (this.currentActor) {
      if (roles.indexOf(RolesEnum.anonymous) !== -1) {
        result = true;
      }
      else if (roles.indexOf(RolesEnum.signedIn) !== -1) {
        result = true;
      }
      else if (roles.indexOf(userRole) !== -1) {
        result = true;
      } else {
        result = false;
      }
    } else {
      if (roles.indexOf(RolesEnum.anonymous) !== -1) {
        result = true;
      } else {
        result = false;
      }
    }
    return result;
  }

  isLoggedIn():boolean{
    return localStorage.getItem('STATUS') === "LOGGED_IN";
  }

  getRole() {
    return localStorage.getItem('ROLE');
  }


  getUserId() {
    return localStorage.getItem('ACTOR_ID');
  }

}
