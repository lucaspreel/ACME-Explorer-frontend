import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-sponsorship-list',
  templateUrl: './sponsorship-list.component.html',
  styleUrls: ['./sponsorship-list.component.css']
})
export class SponsorshipListComponent extends TranslatableComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  private sponsorships: Sponsorship[];
  private actorId: String;
  private role: string;

  constructor(private translateService: TranslateService, private sponsorshipService: SponsorshipService,
    private messageService: MessageService, private authService: AuthService) {
    super(translateService);
  }

  paySponsorship(pos: number) {
    this.sponsorshipService.paySponsorship(this.sponsorships[pos], this.sponsorships[pos].id);
    this.messageService.notifyMessage('messages.sponsor.sponsorhip.payed', 'alert alert-primary');
  }

  removeSponsorship(pos: number) {
    this.sponsorshipService.removeSponsorship(this.sponsorships[pos], this.sponsorships[pos].id);
    this.messageService.notifyMessage('messages.sponsor.sponsorhip.deleted', 'alert alert-primary');
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.sponsorshipService.getSponsorshipsList()
    .then((sponsorshipList: Sponsorship[]) => {
      this.sponsorships = sponsorshipList;
      this.filterSponsorships();
      this.dtTrigger.next();
    });
  }

  filterSponsorships() {
    this.actorId = this.authService.getUserId();
    this.role = this.authService.getRole();

    if (this.role === 'SPONSOR') {
      console.log(this.actorId);
      // tslint:disable-next-line: triple-equals
      const res = this.sponsorships.filter(s => (s.isDeleted === false && s.sponsorId == this.actorId));
      this.sponsorships = res;
    } else {
      this.sponsorships = [];
    }
  }
}
