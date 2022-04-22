import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent extends TranslatableComponent implements OnInit {

  trips: Trip[];

  constructor(private fb: FormBuilder,
    private translateService: TranslateService,
    private tripService: TripService,
    private router:Router) {
    super(translateService);
  }

  ngOnInit() {
    this.tripService.getTrips()
    .then((val) => {
      this.trips = val;
    })
    .catch((err) => {
      console.log(err);
    })
  }

}
