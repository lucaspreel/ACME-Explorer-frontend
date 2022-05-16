import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { TripService } from 'src/app/services/trip.service';
import { ValidateURL } from '../../shared/urlValidator.validator';
import { ExistingTripTicker } from '../../shared/existingTripTicker.validator';

@Component({
  selector: 'app-sponsorship-create',
  templateUrl: './sponsorship-create.component.html',
  styleUrls: ['./sponsorship-create.component.css']
})
export class SponsorshipCreateComponent implements OnInit {

  private sponsorshipForm: FormGroup;
  private id: string;
  private tripTicker: string;
  private actorId: any;
  private role: any;

  constructor(private tripService: TripService, private route: ActivatedRoute,
    private fb: FormBuilder, private translateService: TranslateService,
    private sponsorshipService: SponsorshipService, private messageService: MessageService,
    private authService: AuthService, private router: Router) {

  }


  createForm() {
    this.sponsorshipForm = this.fb.group({
      banner: ['', [Validators.required, ValidateURL]],
      page: ['', [Validators.required, ValidateURL]],
      tripTicker: ['', [Validators.required], [ExistingTripTicker(this.tripService)]],
      sponsorId: [''],
      isPayed: [''],
      isDeleted: ['']
    });

    this.sponsorshipForm.controls['isPayed'].setValue(false);
    this.sponsorshipForm.controls['sponsorId'].setValue(Number(this.actorId));
    this.sponsorshipForm.controls['isDeleted'].setValue(false);

    if (this.tripTicker) {
      this.sponsorshipForm.controls['tripTicker'].setValue(this.tripTicker);
      this.sponsorshipForm.controls['tripTicker'].disable();
    }
  }

  onCreate() {
    if (this.tripTicker) {
      this.sponsorshipForm.controls['tripTicker'].enable();
    }
    this.sponsorshipService.createSponsorship(this.sponsorshipForm.value);
    this.router.navigateByUrl(`sponsorships`);
    this.messageService.notifyMessage('messages.sponsor.sponsorhip.created', 'alert alert-primary');
  }

  ngOnInit() {
    this.actorId = this.authService.getUserId();
    this.role = this.authService.getRole();
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.tripService.getTrip(this.id)
      .then((val) => {
        this.tripTicker = val.ticker;
      })
      .catch((err) => {
        console.log(err);
      }).then(_ => {
        this.createForm();
      });
    } else {
      this.createForm();
    }
  }

}
