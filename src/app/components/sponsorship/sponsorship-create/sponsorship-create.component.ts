import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'src/app/services/message.service';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-sponsorship-create',
  templateUrl: './sponsorship-create.component.html',
  styleUrls: ['./sponsorship-create.component.css']
})
export class SponsorshipCreateComponent implements OnInit {

  private sponsorshipForm: FormGroup;
  private id: string;
  private tripTicker: string;

  // tslint:disable-next-line: max-line-length
  constructor(private tripService: TripService, private route: ActivatedRoute,
    private fb: FormBuilder, private translateService: TranslateService,
    private sponsorshipService: SponsorshipService, private messageService: MessageService) {

  }


  createForm() {
    if (this.tripTicker) {
      this.sponsorshipForm = this.fb.group({
        banner: [''],
        page: [''],
        tripTicker: [this.tripTicker],
        isPayed: [false],
        isDeleted: [false]
      });
    } else {
      this.sponsorshipForm = this.fb.group({
        banner: [''],
        page: [''],
        tripTicker: [''],
        isPayed: [false],
        isDeleted: [false]
      });
    }
  }

  onCreate() {
    if (this.tripTicker) {
      this.sponsorshipService.createSponsorship(this.sponsorshipForm.value);
      this.messageService.notifyMessage('messages.sponsor.sponsorhip.created', 'alert alert-primary');
    } else {
      this.tripService.getTrips()
      .then((val) => {
        const trips = val;
        const res = trips.find(t => t.ticker === this.sponsorshipForm.value.tripTicker);
        if (!res) {
          this.messageService.notifyMessage('errorMessages.sponsor.trip.not.found', 'alert alert-danger');
        } else {
          this.sponsorshipService.createSponsorship(this.sponsorshipForm.value);
          this.messageService.notifyMessage('messages.sponsor.sponsorhip.created', 'alert alert-primary');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.tripService.getTrip(this.id)
      .then((val) => {
        this.tripTicker = val.ticker;
      })
      .catch((err) => {
        console.log(err);
      }).then(_ => {
        this.createForm();
      });
  }

}
