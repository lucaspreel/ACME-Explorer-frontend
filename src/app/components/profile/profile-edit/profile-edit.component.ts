import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';
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
      name: [''],
      surname: [''],
      email: [''],
      password: [''],
      phone: [''],
      address: [''],
      preferredLanguage: [''],
      photo: [''],
      role: [''],
    });
    const idActor = this.authService.getUserId();
    this.actorService.getActor(idActor).then((actor) => {
      this.actor = actor;
      console.log(JSON.stringify(actor));
      if(actor) {
        this.profileForm.controls['id'].setValue(actor.id);
        this.profileForm.controls['name'].setValue(actor.name);
        this.profileForm.controls['surname'].setValue(actor.surname);
        this.profileForm.controls['email'].setValue(actor.email);
        this.profileForm.controls['password'].setValue(actor.password);
        this.profileForm.controls['phone'].setValue(actor.phone);
        this.profileForm.controls['preferredLanguage'].setValue(actor.preferredLanguage);
        this.profileForm.controls['role'].setValue(actor.role);
        this.profileForm.controls['address'].setValue(actor.address);
      }
    });
  }

  onSubmit() {
    const formModel = this.profileForm.value;
    this.actorService.updateProfile(formModel).then((val) => {
      this.router.navigate(['/trips']);
    }).catch((err) => {
      console.error(err);
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}
