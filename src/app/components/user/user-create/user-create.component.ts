import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  registrationForm: FormGroup;
  roleList: string[];
  returnUrl: string;

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) {
      this.roleList = this.authService.getRoles();
      this.createForm();
     }

  ngOnInit() {
  }

  createForm() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      address: [''],
      role: ['', Validators.required],
      validated: ['']
    });

    this.registrationForm.controls['validated'].setValue('true');
    this.registrationForm.controls['role'].setValue('MANAGER');
    this.registrationForm.controls['role'].disable();
  }

  onRegister() {
    if (this.registrationForm.valid) {
      this.registrationForm.controls['role'].enable();
      this.authService.registerUser(this.registrationForm.value)
        .then(res => {
          console.log(res);
          this.router.navigateByUrl(this.returnUrl);
        }, err => {
          console.log(err);
        });
    }
  }
}
