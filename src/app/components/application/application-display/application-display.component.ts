import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Application } from 'src/app/models/application.model';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-application-display',
  templateUrl: './application-display.component.html',
  styleUrls: ['./application-display.component.css']
})
export class ApplicationDisplayComponent extends TranslatableComponent implements OnInit {

  private application: Application;
  private id: string;
  private role: string;


  constructor(
    private translateService: TranslateService, 
    private applicationService: ApplicationService, 
    private route: ActivatedRoute, 
    private router: Router,
    // private authService: AuthService,
    ) { super(translateService); }

  payApplication() {
    this.applicationService.payApplication(this.application, this.id);
  }

  removeApplication() {
    this.applicationService.removeApplication(this.id);
  }

  updateApplication(): void {
    this.router.navigate(['/applications/' + this.id + '/edit']);
  }

  goBack(): void {
    this.router.navigate(['/applications']);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    // this.role = this.authService.getRole();
    this.role =  'EXPLORER';
    this.applicationService.getApplication(this.id)
    .then((application: Application) => {
      this.application = application;
    }).catch((err) => {
      console.error('error');
    });
  }

}
