import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-denied-acces-page',
  templateUrl: './denied-acces-page.component.html',
  styleUrls: ['./denied-acces-page.component.css']
})
export class DeniedAccesPageComponent extends TranslatableComponent implements OnInit {

  private url: string;

  constructor(private translateService: TranslateService, private route: ActivatedRoute) {
    super(translateService);
  }

  ngOnInit() {
    this.url = location.origin + this.route.snapshot.queryParams['previousURL'];
  }

}
