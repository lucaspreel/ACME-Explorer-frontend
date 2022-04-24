import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Sponsorship } from 'src/app/models/sponsorship.model';
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

  constructor(private translateService: TranslateService, private sponsorshipService: SponsorshipService,
    private messageService: MessageService) {
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
    const res = this.sponsorships.filter(s => s.isDeleted === false);
    this.sponsorships = res;
  }
}
