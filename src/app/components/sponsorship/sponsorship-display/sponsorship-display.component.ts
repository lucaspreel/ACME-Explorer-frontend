import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-sponsorship-display',
  templateUrl: './sponsorship-display.component.html',
  styleUrls: ['./sponsorship-display.component.css']
})
export class SponsorshipDisplayComponent extends TranslatableComponent implements OnInit {

  private id: string;
  private sponsorship: Sponsorship;
  private sponsorshipForm: any;

  // tslint:disable-next-line: max-line-length
  constructor(private translateService: TranslateService, private fb: FormBuilder, private sponsorshipService: SponsorshipService, private route: ActivatedRoute) {
    super(translateService);
    this.sponsorshipService.getSponsorship(this.route.snapshot.params['id'])
    .then((sponsorship: Sponsorship) => {
      this.sponsorship = sponsorship;
    }).then(_ => {
      this.createForm();
    });
   }

   createForm() {
    this.sponsorshipForm = this.fb.group({
      banner: [''],
      page: [''],
      tripTicker: [''],
      isPayed: ['false']
    });

    this.sponsorshipForm.controls['tripTicker'].setValue(this.sponsorship.tripTicker);
    this.sponsorshipForm.controls['banner'].setValue(this.sponsorship.banner);
    this.sponsorshipForm.controls['page'].setValue(this.sponsorship.page);
    this.sponsorshipForm.controls['isPayed'].setValue(this.sponsorship.isPayed);
  }

  ngOnInit() {
  }

}
