import { Injectable } from '@angular/core';
import { Trip } from '../models/trip.model';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient, private messageService: MessageService, private router: Router) { }

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
    this.http.post(url, body, httpOptions).toPromise().then((trip: Trip) => {
      console.log(trip);
      this.router.navigate(['/trips']);
      this.messageService.notifyMessage('messages.trips.create.correct', 'alert alert-primary');
    }).catch(error => {
      console.log(error);
      this.messageService.notifyMessage('errorMessages.trips.create.failed', 'alert alert-danger');
    });
  }

  updateTrip(trip: Trip, tripId: string): void {
    const url = `${environment.json_server_baseURL + '/trips/' + tripId}`;
    const body = JSON.stringify(trip);
    this.http.put(url, body, httpOptions).toPromise().then(() => {
      this.router.navigate(['/trips']);
      this.messageService.notifyMessage('messages.trips.update.correct', 'alert alert-primary');
    }).catch(error => {
      console.log(error);
      this.messageService.notifyMessage('errorMessages.trips.update.failed', 'alert alert-danger');
    });
  }

  deleteTrip(tripId: string): void {
    const url = `${environment.json_server_baseURL + '/trips/' + tripId}`;
    this.http.delete(url, httpOptions).toPromise().then(() => {
      this.router.navigate(['/trips']);
      this.messageService.notifyMessage('messages.trips.delete.correct', 'alert alert-primary');
    }).catch(error => {
      console.log(error);
      this.messageService.notifyMessage('errorMessages.trips.delete.failed', 'alert alert-danger');
    });
  }
}
