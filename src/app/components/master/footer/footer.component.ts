import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends TranslatableComponent implements OnInit {

  today: number;
  numClients: number;

  constructor(private translateService: TranslateService) {
    super(translateService);
  }

  ngOnInit() {
    this.today = Date.now();
    this.numClients = 123456;
  }

}
