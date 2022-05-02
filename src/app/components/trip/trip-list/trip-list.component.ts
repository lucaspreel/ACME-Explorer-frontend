import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';
import { e } from '@angular/core/src/render3';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent extends TranslatableComponent implements OnInit {

  trips: Trip[];
  actor: Actor;
  managerId: string;

  constructor(private fb: FormBuilder,
    private translateService: TranslateService,
    private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
    super(translateService);
  }

  ngOnInit() {
    this.managerId = this.route.snapshot.params['managerId'];
    if (this.managerId == undefined) {
      this.tripService.getTrips()
        .then((val) => {
          this.trips = val;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.tripService.getTripsOfAManager(this.managerId)
        .then((val) => {
          this.trips = val;
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.authService.getCurrentActor().then((actor: Actor) => { this.actor = actor; });
  }

  createTrip() {
    this.router.navigate(['/trips/create']);
  }

  createApplication(tripIp: string) {
    this.router.navigate([`/applications/create/${tripIp}`]);
  }

  isAvailable(trip: Trip): boolean {
    const dateNow = new Date();
    const splittedDate = trip.startDate.toString().split('/')

    const dayS = Number.parseInt(splittedDate[0])
    const dayN = dateNow.getDay();

    const monthS = Number.parseInt(splittedDate[1])
    const monthN = dateNow.getMonth();

    const yearS = Number.parseInt(splittedDate[2])
    const yearN = dateNow.getFullYear();


    if (yearS > yearN) {
      return true;
    } else if (yearS === yearN && monthS > monthN) {
      return true;
    } else if (yearS === yearN && monthS === monthN && dayS > dayN) {
      return true;
    } else {
      return false;
    }
  }
}
