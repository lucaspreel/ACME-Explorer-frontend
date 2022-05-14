import { AbstractControl } from '@angular/forms';

export function ValidateURL(control: AbstractControl) {
    if (control.value != null ) {
        if (!control.value.startsWith('http')) {
            return { validUrl: false};
        }
    }
    return null;
}
