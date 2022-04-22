import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  private sponsorship: Sponsorship;
  private sponsorshipForm: any;
  private id: string;

  // tslint:disable-next-line: max-line-length
  constructor(private translateService: TranslateService, private sponsorshipService: SponsorshipService, private route: ActivatedRoute, private router: Router) {
    super(translateService);
   }

  paySponsorship() {
    this.sponsorshipService.paySponsorship(this.sponsorship, this.sponsorship.id);
  }

  removeSponsorship() {
    this.sponsorshipService.removeSponsorship(this.sponsorship, this.sponsorship.id);
  }

  updateSponsorship(): void {
    this.router.navigate(['/sponsorships/' + this.id + '/edit']);
  }

  goBack(): void {
    this.router.navigate(['/sponsorships']);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.sponsorshipService.getSponsorship(this.id)
    .then((sponsorship: Sponsorship) => {
      this.sponsorship = sponsorship;
    }).catch((err) => {
      console.error(err);
    });
  }

}
