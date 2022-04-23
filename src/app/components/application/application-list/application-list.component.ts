import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { Actor } from 'src/app/models/actor.model';
import { Application } from 'src/app/models/application.model';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent extends TranslatableComponent implements OnInit {

  actorId: String;
  role: string;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  private applications: Application[];

  constructor(
    private translateService: TranslateService,
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    super(translateService);
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };

    this.loadData();
  }

  loadData() {
    let actorId = this.authService.getUserId();
    this.actorId = actorId;
    let role = this.authService.getRole();
    console.log(this.role);

    if (actorId != undefined) {
      if (role === 'MANAGER') {
        this.role = 'MANAGER';
        this.applicationService.getApplicationByManager(actorId)
          .then((applicationsList: Application[]) => {
            this.applications = applicationsList;
            this.dtTrigger.next();
          });
      } else if (role === 'EXPLORER') {
        this.role = 'EXPLORER';

        this.applicationService.getApplicationByExplorer(actorId)
          .then((applicationsList: Application[]) => {
            this.applications = applicationsList;
            this.dtTrigger.next();
          });
      } else if (role === 'ADMINISTRATOR') {
        this.role = 'ADMINISTRATOR';
        this.applicationService.getApplications()
          .then((applicationsList: Application[]) => {
            this.applications = applicationsList;
            this.dtTrigger.next();
          });
      } else {
        this.role = 'annonimous';
        this.applications = [];
      }
    } else {
      this.applicationService.getApplications()
        .then((applicationsList: Application[]) => {
          this.applications = applicationsList;
          this.dtTrigger.next();
        });
    }
  }

}
