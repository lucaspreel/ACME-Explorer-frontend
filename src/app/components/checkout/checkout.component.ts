import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { Application } from 'src/app/models/application.model';
import { Trip } from 'src/app/models/trip.model';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent extends TranslatableComponent implements OnInit {

  private payPalConfig: PayPalConfig;
  private application: Application;

  constructor(
    private translateService: TranslateService,
    private applicationService: ApplicationService,
    private authService: AuthService,
    private route: ActivatedRoute, 
    private router: Router,
  ) {
    super(translateService);
  }

  ngOnInit() {
    this.initConfig();
  }

  initConfig(){
    const applicationId = this.route.snapshot.params['id'];

    this.applicationService.getApplication(applicationId)
    .then((application: Application) => {
      this.application = application;
      this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
        commit: true,
        client: {
          sandbox: 'AU1prJXkUtsY_sFn_nrhw38VAYPl2B9tiHHr08LKod2Fkdaa8FXY3T9zbf1jbvMYuVJdsOVUcTPfr_rY'
        },
        button: {
          label: 'paypal',
        },
        onPaymentComplete: (data, actions) => {
          this.payApplication();
        },
        onCancel: (data, actions) => {
          console.log('OnCancel');
        },
        onError: (err) => {
          console.log('OnError');
        },
        transactions: [{
          amount: {
            currency: 'EUR',
            total: application.tripPrice,
          }
        }]
      });
    }).catch((err) => {
      console.error('error');
    });


  }

  payApplication() {
    console.log('pay');
    this.applicationService.payApplication(this.application, this.application.id);
    this.navigateTo('applications');
  }

  navigateTo(ruta: string) {
    this.router.navigateByUrl(ruta);
  }


}
