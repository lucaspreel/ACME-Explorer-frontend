import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-sponsorship-display',
  templateUrl: './sponsorship-display.component.html',
  styleUrls: ['./sponsorship-display.component.css']
})
export class SponsorshipDisplayComponent extends TranslatableComponent implements OnInit {

  private sponsorship: Sponsorship;
  private id: string;
  private actorId: any;
  private role: any;

  constructor(private translateService: TranslateService, private sponsorshipService: SponsorshipService,
    private route: ActivatedRoute, private router: Router,
    private messageService: MessageService,
    private authService: AuthService) {
    super(translateService);
   }

  paySponsorship() {
    this.sponsorshipService.paySponsorship(this.sponsorship, this.sponsorship.id);
    this.messageService.notifyMessage('messages.sponsor.sponsorhip.payed', 'alert alert-primary');
  }

  removeSponsorship() {
    this.sponsorshipService.removeSponsorship(this.sponsorship, this.sponsorship.id);
    this.router.navigateByUrl('sponsorships');
    this.messageService.notifyMessage('messages.sponsor.sponsorhip.deleted', 'alert alert-primary');
  }

  updateSponsorship(): void {
    this.router.navigateByUrl('sponsorships/' + this.id + '/edit');
  }

  goBack(): void {
    this.router.navigateByUrl(`sponsorships`);
  }

  ngOnInit() {
    this.actorId = this.authService.getUserId();
    this.role = this.authService.getRole();
    this.id = this.route.snapshot.params['id'];
    this.sponsorshipService.getSponsorship(this.id)
    .then((sponsorship: Sponsorship) => {
      // tslint:disable-next-line: triple-equals
      if (Number(this.actorId) == sponsorship.sponsorId) {
        this.sponsorship = sponsorship;
      } else {
        this.router.navigateByUrl(`/`);
      }
    }).catch((err) => {
      console.error(err);
    });
  }

}
