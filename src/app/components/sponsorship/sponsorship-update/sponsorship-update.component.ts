import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { TripService } from 'src/app/services/trip.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { ValidateURL } from '../../shared/urlValidator.validator';
import { ExistingTripTicker } from '../../shared/existingTripTicker.validator';

@Component({
  selector: 'app-sponsorship-update',
  templateUrl: './sponsorship-update.component.html',
  styleUrls: ['./sponsorship-update.component.css']
})
export class SponsorshipUpdateComponent extends TranslatableComponent implements OnInit {

  private id: string;
  private sponsorship: Sponsorship;
  private sponsorshipForm: FormGroup;
  private role: any;
  private actor: Actor;

  constructor(private translateService: TranslateService, private fb: FormBuilder,
    private sponsorshipService: SponsorshipService, private route: ActivatedRoute,
    private messageService: MessageService, private tripService: TripService,
    private router: Router, private authService: AuthService) {
    super(translateService);
  }

  createForm() {
    this.sponsorshipForm = this.fb.group({
      id: [''],
      sponsorId: [''],
      isDeleted: [''],
      banner: ['', [Validators.required, ValidateURL]],
      page: ['', [Validators.required, ValidateURL]],
      tripTicker: ['', [Validators.required], [ExistingTripTicker(this.tripService)]],
      isPayed: ['']
    });

    const actorId = this.authService.getUserId();
    this.id = this.route.snapshot.params['id'];
    this.sponsorshipService.getSponsorship(this.id)
      .then((sponsorship: Sponsorship) => {
        this.sponsorship = sponsorship;
        if (sponsorship) {
          if (Number(actorId) === sponsorship.sponsorId) {
            console.log(JSON.stringify(sponsorship));
            this.sponsorshipForm.controls['id'].setValue(sponsorship.id);
            this.sponsorshipForm.controls['sponsorId'].setValue(sponsorship.sponsorId);
            this.sponsorshipForm.controls['isDeleted'].setValue(sponsorship.isDeleted);
            this.sponsorshipForm.controls['tripTicker'].setValue(sponsorship.tripTicker);
            this.sponsorshipForm.controls['page'].setValue(sponsorship.page);
            this.sponsorshipForm.controls['banner'].setValue(sponsorship.banner);
            this.sponsorshipForm.controls['isPayed'].setValue(sponsorship.isPayed);
          } else {
            this.router.navigateByUrl(`/`);
          }
        }
      });
  }

  onUpdate() {

    this.sponsorshipService.updateSponsorship(this.sponsorshipForm.value, this.id);
    this.router.navigate(['/sponsorships']);
    this.messageService.notifyMessage('messages.sponsor.sponsorhip.updated', 'alert alert-primary');
  }

  ngOnInit() {
    this.createForm();
  }

  goBack(): void {
    this.router.navigateByUrl(`sponsorships`);
  }

}
