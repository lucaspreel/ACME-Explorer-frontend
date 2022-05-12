import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { e } from '@angular/core/src/render3';
import { ApplicationService } from 'src/app/services/application.service';
import { Application } from 'src/app/models/application.model';

@Component({
  selector: 'app-application-create',
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.css']
})
export class ApplicationCreateComponent extends TranslatableComponent implements OnInit {

  private trip: Trip
  private applicationForm: any;
  private applicationComments: string

  constructor(private fb: FormBuilder,
    private translateService: TranslateService,
    private tripService: TripService,
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
    super(translateService);
  }

  ngOnInit() {
    const tripId = this.route.snapshot.params['tripId'];
    let actorId = this.authService.getUserId();
    this.tripService.getTrip(tripId).then((value) => {
      if (value) {
        this.trip = value;
        this.createForm(value, actorId);
      }
    });
  }

  createForm(trip: Trip, actorId: string) {
    this.applicationForm = this.fb.group({
      comments: [this.applicationComments],
      applicationMoment: [new Date()],
      status: 'PENDING',
      explorer_Id: actorId,
      trip_Id: trip.id,
      rejected_reason: '',
      tripPrice: trip.price,
      manager_Id: trip.managerId,
      deleted: false,
    });
  }

  onCreate() {
    console.log(this.applicationForm.value);
    this.applicationService.createApplication(this.applicationForm.value);
    this.router.navigate(['/applications']);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}
