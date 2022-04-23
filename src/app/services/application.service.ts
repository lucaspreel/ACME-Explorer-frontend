import { Injectable } from '@angular/core';
import { Application } from '../models/application.model';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const route = "applications";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  getRuta(){
    return `${environment.json_server_baseURL}/${route}`;
  }


  getApplication(id: string): Promise<Application> {
    const url = `${this.getRuta()}/ + id`;
    return this.http.get<Application>(url).toPromise();
  }

  getApplications(): Promise<Application[]> {
    const url = this.getRuta();
    return this.http.get<Application[]>(url).toPromise();
  }

  getApplicationByManager(managerId: string):Promise<Application[]>  {
    const url = `${this.getRuta}?manager_Id=${managerId}`;
    return this.http.get<Application[]>(url).toPromise(); 
  }

  getApplicationByExplorer(explorerId: string):Promise<Application[]>  {
    const url = `${this.getRuta}?explorer_Id=${explorerId}`;
    return this.http.get<Application[]>(url).toPromise(); 
  }
}

