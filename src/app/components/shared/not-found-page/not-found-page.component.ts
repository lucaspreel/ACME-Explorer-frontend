import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent extends TranslatableComponent implements OnInit {

  constructor(private translateService: TranslateService) {
    super(translateService);
  }

  ngOnInit() {
  }

}
