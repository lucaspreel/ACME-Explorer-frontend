import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
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
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login'
    }


    createForm() {
      this.registrationForm = this.fb.group({
        name: ['',Validators.required],
        surname: [''],
        email: ['',[Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(6)]],
        phone: ['', Validators.required],
        address: [''],
        role: ['', Validators.required],
        validated: ['true']
      });
    }

    onRegister() {
      if(this.registrationForm.valid){
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

