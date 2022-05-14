import { Injectable } from '@angular/core';
import { Application } from '../models/application.model';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TripService } from './trip.service';
import { Trip } from '../models/trip.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const route = "applications";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient, private tripService: TripService,) { }

  getRuta() {
    return `${environment.json_server_baseURL}/${route}`;
  }


  getApplication(id: string): Promise<Application> {
    const url = `${this.getRuta()}/${id}`;
    return this.http.get<Application>(url).toPromise();
  }

  getApplications(): Promise<Application[]> {
    const url = this.getRuta();
    return this.http.get<Application[]>(url).toPromise();
  }

  getApplicationByManager(managerId: string): Promise<Application[]> {
    const url = `${this.getRuta()}?manager_Id=${managerId}`;
    return this.http.get<Application[]>(url).toPromise();
  }

  getApplicationByExplorer(explorerId: string): Promise<Application[]> {
    const url = `${this.getRuta()}?explorer_Id=${explorerId}`;
    return this.http.get<Application[]>(url).toPromise();
  }

  removeApplication(applicationId: string): void {
    const url = `${this.getRuta()}/${applicationId}`;
    this.http.patch(url, {
      'isDeleted': true,
    }).toPromise();
  }

  payApplication(application: Application, applicationId: string): void {
    const url = `${this.getRuta()}/${applicationId}`;
    const body = JSON.stringify(application);
    this.http.patch(url, {
      'status': 'ACCEPTED',
    }).toPromise();
  }

  updateApplication(applicationId: string, data: any): void {
    const url = `${this.getRuta()}/${applicationId}`;
    const body = JSON.stringify(data);
    this.http.patch(url,body).toPromise();
  }

  createApplication(application):void {
    const url = this.getRuta();
    const body = JSON.stringify(application);
    this.http.post(url,body).toPromise();
  }

  async getTripsNames(applications: Application[]){
    const trips = await this.tripService.getTrips();
    let filterTrips = [];
    for (var val of applications) {
      let trip = trips.find(element => element.id == `${val.trip_Id}`);
      filterTrips.push(trip.title);
    }
    return filterTrips;
  }
}

