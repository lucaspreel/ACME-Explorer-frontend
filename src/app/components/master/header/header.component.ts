import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';

import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends TranslatableComponent implements OnInit {

  private currentActor: Actor;
  private activeRole: string;

  constructor(private authService: AuthService,
    private translateService: TranslateService) {
    super(translateService);
  }

  changeLanguage(language: string): void {
    super.changeLanguage(language);
  }

  ngOnInit() {
    this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.currentActor = this.authService.getCurrentActor();
        this.activeRole = this.currentActor.role.toString();
      } else {
        this.activeRole = 'anonymous';
        this.currentActor = null;
      }
    });
  }

  logout() {
    this.authService.logout()
      .then(_ => {
        this.activeRole = 'anonymous';
        this.currentActor = null;
      }).catch(error => {
        console.log(error);
      });
  }


}
