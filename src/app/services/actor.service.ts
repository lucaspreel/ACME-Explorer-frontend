import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Actor } from '../models/actor.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'applications/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  token: string;
  userRole: string;
  private apiUrl = environment.json_server_baseURL + '/actors';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getActor(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Actor>(url).toPromise();
  }

  updateProfile(actor: Actor) {
    const url = `${this.apiUrl}/${actor.id}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'applications/json');

    const body = JSON.stringify(actor);

    return new Promise<any>((resolve, reject) => {
      this.http.put(url, body, httpOptions).toPromise()
      .then(res => {
        this.authService.setCurrentActor(actor);
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  getActors() {
    return this.http.get<Actor[]>(this.apiUrl).toPromise();
  }
}
