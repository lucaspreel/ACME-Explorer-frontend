import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SponsorshipService } from 'src/app/services/sponsorship.service';

@Component({
  selector: 'app-sponsorship-create',
  templateUrl: './sponsorship-create.component.html',
  styleUrls: ['./sponsorship-create.component.css']
})
export class SponsorshipCreateComponent implements OnInit {

  sponsorshipForm: FormGroup;

  constructor(private fb: FormBuilder, private translateService: TranslateService, private sponsorshipService: SponsorshipService) {
      this.createForm();
    }


    createForm() {
      this.sponsorshipForm = this.fb.group({
        banner: [''],
        page: [''],
        tripTicker: [''],
        isPayed: ['false']
      });
    }

    onCreate() {
      this.sponsorshipService.createSponsorship(this.sponsorshipForm.value);
    }

  ngOnInit() {
  }

}
