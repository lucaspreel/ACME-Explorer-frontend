import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedDecimal',
  pure: false
})
export class LocalizedDecimalPipe implements PipeTransform {

  constructor(private translateService: TranslateService) {
  }

  transform(value: any, digitsInfo: string= '1.0-3'): any {
    const decimalPipe: DecimalPipe = new DecimalPipe(
      this.translateService.currentLang);
    return decimalPipe.transform(value, digitsInfo);
  }

}
