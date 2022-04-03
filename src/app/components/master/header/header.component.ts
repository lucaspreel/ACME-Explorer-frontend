import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends TranslatableComponent implements OnInit {

  constructor(private authService: AuthService,
    private translateService: TranslateService) {
    super(translateService);
  }

  changeLanguage(language: string): void {
    super.changeLanguage(language);
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout()
      .then(_ => {
        console.log('logging out...');
      }).catch(error => {
        console.log(error);
      })
  }


}
