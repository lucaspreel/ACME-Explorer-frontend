import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { MessageService } from 'src/app/services/message.service';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { TripService } from 'src/app/services/trip.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-sponsorship-update',
  templateUrl: './sponsorship-update.component.html',
  styleUrls: ['./sponsorship-update.component.css']
})
export class SponsorshipUpdateComponent extends TranslatableComponent implements OnInit {

  private id: string;
  private sponsorship: Sponsorship;
  private sponsorshipForm: any;

  // tslint:disable-next-line: max-line-length
  constructor(private translateService: TranslateService, private fb: FormBuilder,
    private sponsorshipService: SponsorshipService, private route: ActivatedRoute,
    private messageService: MessageService, private tripService: TripService) {
    super(translateService);
    this.id = this.route.snapshot.params['id'];
    this.sponsorshipService.getSponsorship(this.id)
      .then((sponsorship: Sponsorship) => {
        this.sponsorship = sponsorship;
      }).then(_ => {
        this.createForm();
      });
  }

  createForm() {
    this.sponsorshipForm = this.fb.group({
      banner: [this.sponsorship.banner],
      page: [this.sponsorship.page],
      tripTicker: [this.sponsorship.tripTicker],
      isPayed: [this.sponsorship.isPayed]
    });
  }

  onUpdate() {
    this.tripService.getTrips()
      .then((val) => {
        const trips = val;
        const res = trips.find(t => t.ticker === this.sponsorshipForm.value.tripTicker);
        if (!res) {
          this.messageService.notifyMessage('errorMessages.sponsor.trip.not.found', 'alert alert-danger');
        } else {
          this.sponsorshipService.updateSponsorship(this.sponsorshipForm.value, this.id);
          this.messageService.notifyMessage('messages.sponsor.sponsorhip.updated', 'alert alert-primary');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit() {
  }

}
