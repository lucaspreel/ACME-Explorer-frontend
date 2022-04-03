import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

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
