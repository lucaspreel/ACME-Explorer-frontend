import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Picture } from 'src/app/models/picture.model';
import { Trip } from 'src/app/models/trip.model';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-trip-update',
  templateUrl: './trip-update.component.html',
  styleUrls: ['./trip-update.component.css']
})
export class TripUpdateComponent extends TranslatableComponent implements OnInit {

  tripForm : FormGroup;
  trip: Trip;
  photoChanged = false;
  picture: string;
  idTrip: string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private tripService: TripService,
    private translateService: TranslateService) {
      super(translateService);
    }

  ngOnInit() {
    this.createForm();
  }

  createForm () {
    this.tripForm = this.fb.group({
      id: [''],
      ticker: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      picture: [''],
      photoObject: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      stages: [''],
      cancelled: [''],
      managerId: ['']
    });
    this.idTrip = this.route.snapshot.params['id'];
    this.tripService.getTrip(this.idTrip).then((trip) => {
      this.trip = trip;
      console.log(JSON.stringify(trip));
      if(trip) {
        this.tripForm.controls['id'].setValue(trip.id);
        this.tripForm.controls['ticker'].setValue(trip.ticker);
        this.tripForm.controls['title'].setValue(trip.title);
        this.tripForm.controls['description'].setValue(trip.description);
        this.tripForm.controls['price'].setValue(trip.price);
        this.tripForm.controls['picture'].setValue(trip.picture);
        this.tripForm.controls['photoObject'].setValue(trip.photoObject);
        this.tripForm.controls['startDate'].setValue(trip.startDate);
        this.tripForm.controls['endDate'].setValue(trip.endDate);
        this.tripForm.controls['cancelled'].setValue(trip.cancelled);
        this.tripForm.controls['managerId'].setValue(trip.managerId);
        this.picture = trip.photoObject.Buffer;
        document.getElementById('showResult').textContent = trip.photoObject.Buffer;
      }
    });
  }

  onSubmit() {
    const formModel = this.tripForm.value;
    if (this.photoChanged) {
      formModel.photoObject = new Picture();
      formModel.photoObject.Buffer = document.getElementById('showResult').textContent;
      formModel.photoObject.contentType = 'image/png';
    }
    this.tripService.updateTrip(formModel, this.idTrip);
  }

  onFileChanged (event) {
    const reader = new FileReader();
    const showout = document.getElementById('showResult');
    let res;
    this.photoChanged = true;

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.addEventListener('loadend', function () {
        res = reader.result;
        showout.textContent = res;
      });
      reader.readAsDataURL(file);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}
