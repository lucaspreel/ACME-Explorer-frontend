import { Injectable } from '@angular/core';
import { Application } from '../models/application.model';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  getApplication(id: string) {
    const url = `${environment.json_server_baseURL + '/applications/' + id}`;
    return this.http.get<Application>(url).toPromise();
  }

  getApplications() {
    const url = `${environment.json_server_baseURL + '/applications'}`;
    return this.http.get<Application[]>(url).toPromise();
  }
}

