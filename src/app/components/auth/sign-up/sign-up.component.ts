import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  confirmForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initSignUpForm();
    this.initConfirmForm();
  }

  initSignUpForm() {
    this.signUpForm = this.fb.group({
      name: new FormControl('jacko', [Validators.required]),
      email: new FormControl('jackoboes@gmail.com',[Validators.required]),
      password: new FormControl('jacko123', [Validators.required]),
      confirmPassword: new FormControl('jacko123', [Validators.required])
    })
  }

  initConfirmForm() {
    this.confirmForm = this.fb.group({
      name: new FormControl('jacko', [Validators.required]),
      validationCode: new FormControl(null, [Validators.required])
    })
  }

  onSignUp() {
    if(this.signUpForm.value.password !== this.signUpForm.value.confirmPassword) {
      alert('password !== confirmPassword');
    } else {
      this.authService.signUp(
        this.signUpForm.value.name,
        this.signUpForm.value.email,
        this.signUpForm.value.password,)
    }
  }

  onConfirm() {
    this.authService.confirmUser(
      this.confirmForm.value.name,
      this.confirmForm.value.validationCode
    )
  }
}
