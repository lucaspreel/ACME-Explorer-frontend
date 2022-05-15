import { AsyncValidatorFn, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { TripService } from 'src/app/services/trip.service';
import { Observable } from '../../../../node_modules/rxjs';

export function ExistingTripTicker(tripService: TripService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return tripService.getTrips()
            .then((trips) => {
                const res = trips.find(t => t.ticker === control.value);
                if (!res) {
                    return { 'tripTickerExists': false };
                } else {
                    return null;
                }
            });
    };
}
