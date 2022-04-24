import { Injectable } from '@angular/core';
import { Trip } from '../models/trip.model';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  getTrip(id: string) {
    const url = `${environment.json_server_baseURL + '/trips/' + id}`;
    return this.http.get<Trip>(url).toPromise();
  }

  getTrips() {
    const url = `${environment.json_server_baseURL + '/trips'}`;
    return this.http.get<Trip[]>(url).toPromise();
  }

  getTripsOfAManager(managerId: string) {
    const url = `${environment.json_server_baseURL + '/trips?managerId=' + managerId}`;
    return this.http.get<Trip[]>(url).toPromise(); 
  }

  createTrip(trip: Trip): void {
    const url = `${environment.json_server_baseURL + '/trips'}`;
    const body = JSON.stringify(trip);
    this.http.post(url, body, httpOptions).toPromise();
  }

  updateTrip(trip: Trip, tripId: string): void {
    const url = `${environment.json_server_baseURL + '/trips/' + tripId}`;
    const body = JSON.stringify(trip);
    this.http.put(url, body, httpOptions).toPromise();
  }
}
