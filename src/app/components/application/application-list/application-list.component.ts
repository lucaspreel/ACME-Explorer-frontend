import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { Application } from 'src/app/models/application.model';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent extends TranslatableComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  private applications: Application[];

  constructor(private translateService: TranslateService, private applicationService: ApplicationService) {
    super(translateService);
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.applicationService.getApplications()
    .then((applicationsList: Application[]) => {
      this.applications = applicationsList;
      this.dtTrigger.next();
    });
  }

}
