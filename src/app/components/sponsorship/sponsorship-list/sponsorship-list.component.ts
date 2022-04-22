import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-sponsorship-list',
  templateUrl: './sponsorship-list.component.html',
  styleUrls: ['./sponsorship-list.component.css']
})
export class SponsorshipListComponent extends TranslatableComponent implements OnInit {

  private sponsorships: Sponsorship[];

  constructor(private translateService: TranslateService, private sponsorshipService: SponsorshipService) {
    super(translateService);
    sponsorshipService.getSponsorshipsList()
    .then((sponsorshipList: Sponsorship[]) => {
      this.sponsorships = sponsorshipList;
    });
  }

  paySponsorship(pos: number) {
    this.sponsorshipService.paySponsorship(this.sponsorships[pos], this.sponsorships[pos].id);
  }

  removeSponsorship(pos: number) {
    this.sponsorshipService.removeSponsorship(this.sponsorships[pos], this.sponsorships[pos].id);
  }

  ngOnInit() {
  }

}
