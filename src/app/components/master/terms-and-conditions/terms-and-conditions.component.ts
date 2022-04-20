import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from "@angular/router";
import { Http } from "@angular/http";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-terms-and-conditions',
  template: `<div [innerHtml]='myTemplate'></div>`,
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {

  private myTemplate: any = '';
  private htmlFile = 'assets/terms-and-conditions/terms-and-conditions_' + this.translateService.currentLang + '.html';

  constructor(private translateService: TranslateService, private http: Http, private sanitizer: DomSanitizer,
    private router: Router) {
     this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
       this.htmlFile = 'assets/terms-and-conditions/terms-and-conditions_' + this.translateService.currentLang + '.html';
       this.http.get(this.htmlFile).subscribe((html) => {
         this.myTemplate = sanitizer.bypassSecurityTrustHtml(html.text());
       });
     });
    }

  ngOnInit() {
  }

}
