import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends TranslatableComponent implements OnInit {

  constructor(private authService: AuthService, private translateService: TranslateService) {
    super(translateService);
  }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password).then(_ => {
      form.reset();
    }).catch((error) => {
      console.log(error);
    })
  }

}
