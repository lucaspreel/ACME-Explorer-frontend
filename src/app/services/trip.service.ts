import { Injectable } from '@angular/core';
import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor() { }

  createTrip(): Trip[] {
    let trip: Trip;
    let trips: Trip[];

    trips = new Array();

    //trip 1
    trip = new Trip();
    trip.ticker = "ticker1";
    trip.title = "title1";
    trip.description = "description1";
    trip.price = 10;
    trip.startDate = "01/01/2023";
    trip.endDate = "12/01/2023";
    trip.cancelled = false;
    trips.push(trip);

    //trip 2
    trip = new Trip();
    trip.ticker = "ticker2";
    trip.title = "title2";
    trip.description = "description2";
    trip.price = 10;
    trip.startDate = "01/01/2023";
    trip.endDate = "12/01/2023";
    trip.cancelled = false;
    trips.push(trip);

    //trip 3
    trip = new Trip();
    trip.ticker = "ticker3";
    trip.title = "title3";
    trip.description = "description3";
    trip.price = 10;
    trip.startDate = "01/01/2023";
    trip.endDate = "12/01/2023";
    trip.cancelled = true;
    trips.push(trip);

    return trips;
  }
}
