import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';
import { Picture } from 'src/app/models/picture.model';
import { ActorService } from 'src/app/services/actor.service';
import { AuthService } from 'src/app/services/auth.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent extends TranslatableComponent implements OnInit {

  profileForm: FormGroup;
  actor: Actor;
  langs = ['en', 'es', 'fr'];
  photoChanged = false;
  picture: string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private actorService: ActorService,
    private translateService: TranslateService) {
      super(translateService);
    }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.profileForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: [''],
      password: [''],
      phone: ['', Validators.pattern('[0-9]+')],
      address: [''],
      preferredLanguage: [''],
      photo: [''],
      picture: [''],
      role: [''],
    });
    const idActor = this.authService.getUserId();
    this.actorService.getActor(idActor).then((actor) => {
      this.actor = actor;
      console.log(JSON.stringify(actor));
      if (actor) {
        this.profileForm.controls['id'].setValue(actor.id);
        this.profileForm.controls['name'].setValue(actor.name);
        this.profileForm.controls['surname'].setValue(actor.surname);
        this.profileForm.controls['email'].setValue(actor.email);
        this.profileForm.controls['password'].setValue(actor.password);
        this.profileForm.controls['phone'].setValue(actor.phone);
        this.profileForm.controls['preferredLanguage'].setValue(actor.preferredLanguage);
        this.profileForm.controls['role'].setValue(actor.role);
        this.profileForm.controls['address'].setValue(actor.address);
        this.picture = actor.photoObject.Buffer;
        document.getElementById('showResult').textContent = actor.photoObject.Buffer;
      }
    });
  }

  onSubmit() {
    const formModel = this.profileForm.value;
    if (this.photoChanged) {
      formModel.photoObject = new Picture();
      formModel.photoObject.Buffer = document.getElementById('showResult').textContent;
      formModel.photoObject.contentType = 'image/png';
    }
    this.actorService.updateProfile(formModel).then((val) => {
      this.router.navigate(['/trips']);
    }).catch((err) => {
      console.error(err);
    });
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
