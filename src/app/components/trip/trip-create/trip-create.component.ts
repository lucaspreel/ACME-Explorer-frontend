import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Picture } from 'src/app/models/picture.model';
import { Stage } from 'src/app/models/trip.model';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.css']
})
export class TripCreateComponent extends TranslatableComponent implements OnInit {

  tripForm: FormGroup;
  actorId: any;
  photoChanged = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tripService: TripService,
    private translateService: TranslateService) {
      super(translateService);
    }

  ngOnInit() {
    this.actorId = this.authService.getUserId();
    this.createForm();
  }

  createForm() {
    this.tripForm = this.fb.group({
      ticker: [this.getRandomInt(999999).toString()+'-ABCD'],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0],
      picture: [''],
      photoObject: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      stages: this.fb.array([
        this.fb.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
          price: ['', Validators.required]
        })
      ]),
      cancelled: [false],
      managerId: [this.actorId]
    });
  }

  get stages() {
    return this.tripForm.get('stages') as FormArray;
  }

  addStage() {
    this.stages.push(
      this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required]
      })
    );
  }

  onSubmit () {
    const formModel = this.tripForm.value;
    if (this.photoChanged) {
      formModel.photoObject = new Picture();
      formModel.photoObject.Buffer = document.getElementById('showResult').textContent;
      formModel.photoObject.contentType = 'image/png';
    }
    for (var i=0; i<this.tripForm.value.stages.length; i++) {
      formModel.price += this.tripForm.value.stages[i].price;
    }
    this.tripService.createTrip(formModel);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
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
}
