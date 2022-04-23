import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Trip } from 'src/app/models/trip.model';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.css']
})

export class TripDisplayComponent extends TranslatableComponent implements OnInit {

  trip = new Trip();
  id: string;

  constructor(private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService) {
    super(translateService);
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.tripService.getTrip(this.id)
    .then((val) => {
      this.trip = val;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  createSponsorship(): void {
    this.router.navigate(['/trips/' + this.id + '/sponsorship']);
  }
}
