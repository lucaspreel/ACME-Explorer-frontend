import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';

import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Router } from '@angular/router';
import RolesEnum from 'src/app/utils/roles_enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends TranslatableComponent implements OnInit {

  private currentActorId: string;
  private activeRole: string;

  constructor(private authService: AuthService,
    private translateService: TranslateService,
    private router: Router) {
    super(translateService);
  }

  changeLanguage(language: string): void {
    super.changeLanguage(language);
  }

  ngOnInit() {
    this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.currentActorId = this.authService.getUserId();
        this.activeRole = this.authService.getRole();
      } else {
        this.activeRole = RolesEnum.anonymous;
        this.currentActorId = null;
      }
    });
  }

  logout() {
    this.authService.logout()
      .then(_ => {
        this.activeRole = RolesEnum.anonymous;
        this.currentActorId = null;
      }).catch(error => {
        console.log(error);
      });
  }

}
