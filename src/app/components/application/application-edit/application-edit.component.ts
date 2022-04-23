import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Application } from 'src/app/models/application.model';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls: ['./application-edit.component.css']
})
export class ApplicationEditComponent implements OnInit {

  private id: string;
  private role: string;
  private application: Application;
  private applicationForm: any;

  private statuses: string[];

  constructor(
    private translateService: TranslateService,
    private fb: FormBuilder,
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.role = this.authService.getRole();
    this.applicationService.getApplication(this.id)
      .then((application: Application) => {
        this.application = application;
      }).catch((err) => {
        console.error('error');
      }).then(_ => {
        this.createForm();
        this.getStatus(this.application.status);
      });
  }

  createForm() {
    this.applicationForm = this.fb.group({
      status: [this.application.status],
      comments: [this.application.comments],
    });
  }

  onUpdate() {
    console.log(this.applicationForm.value);
    this.applicationService.updateApplication(this.id, this.applicationForm.value);
  }

  goBack(): void {
    this.router.navigate(['/applications']);
  }

  getStatus(currentStatus: string){
    if(currentStatus === 'PENDING'){
      this.statuses= ['PENDING','DUE','REJECTED'];
    }else if(currentStatus === 'DUE'){
      this.statuses= ['DUE','REJECTED'];
    }else{
      this.statuses= ['REJECTED'];
    }

  }
}
