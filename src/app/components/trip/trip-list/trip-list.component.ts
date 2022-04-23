import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';

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

}
