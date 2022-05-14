import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { Application } from 'src/app/models/application.model';
import { Trip } from 'src/app/models/trip.model';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';

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
  private tripsNames: Trip[];
  actorId: String;
  role: string;

  constructor(
    private translateService: TranslateService,
    private applicationService: ApplicationService,
    private authService: AuthService,
    private router: Router,
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
    let userRole = this.authService.getRole();

    if (actorId != undefined) {
      if (userRole === 'MANAGER') {
        this.role = 'MANAGER';
        this.applicationService.getApplicationByManager(actorId)
          .then(async (applicationsList: Application[]) => {
            this.tripsNames = await this.applicationService.getTripsNames(applicationsList)
            this.applications = applicationsList;
            this.dtTrigger.next();
          });
      } else if (userRole === 'EXPLORER') {
        this.role = 'EXPLORER';

        this.applicationService.getApplicationByExplorer(actorId)
          .then(async (applicationsList: Application[]) => {
            this.tripsNames = await this.applicationService.getTripsNames(applicationsList)
            this.applications = applicationsList;
            this.dtTrigger.next();
          });
      } else if (userRole === 'ADMINISTRATOR') {
        this.role = 'ADMINISTRATOR';
        this.applicationService.getApplications()
          .then(async (applicationsList: Application[]) => {
            this.tripsNames = await this.applicationService.getTripsNames(applicationsList)
            this.applications = applicationsList;
            this.dtTrigger.next();
          });
      } else {
        this.role = 'annonimous';
        this.applications = [];
      }
    } else {
      this.applicationService.getApplications()
        .then(async (applicationsList: Application[]) => {
          this.tripsNames = await this.applicationService.getTripsNames(applicationsList)
          this.applications = applicationsList;
          this.dtTrigger.next();
        });
    }
  }

  removeApplication(pos: number) {
    console.log('remove');
    this.applicationService.removeApplication(this.applications[pos].id);
    this.navigateTo('applications');
  }
  payApplication(pos: number) {
    console.log('pay');
    this.applicationService.payApplication(this.applications[pos], this.applications[pos].id);
    this.navigateTo('applications');
  }

  navigateTo(ruta: string) {
    this.router.navigateByUrl(ruta);
  }
  navigateToEdit(id: string) {
    this.navigateTo(`applications/${id}/edit`);
  }

  navigateToDisplay(id: string) {
    this.navigateTo(`applications/${id}`);
  }

}
