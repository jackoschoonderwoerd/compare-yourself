import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {


 
  signInForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {}


  ngOnInit(): void { 
    this.initForm();
  }

  private initForm() {
    this.signInForm = this.fb.group({
      name: new FormControl('jacko', []),
      password: new FormControl('jacko123', [])
    });
  }

  onSignIn() {
    this.authService.signIn(
      this.signInForm.value.name,
      this.signInForm.value.password
    );
  }
}
