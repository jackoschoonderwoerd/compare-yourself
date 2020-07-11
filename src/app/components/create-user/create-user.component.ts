import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AwsService } from 'src/app/services/aws.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    public aws: AwsService
  ) { }

  createUserForm: FormGroup

  ngOnInit(): void {
    this.initCreateUserForm()
  }

  initCreateUserForm() {
    this.createUserForm = this.fb.group({
      age: new FormControl(1, [Validators.required]),
      height: new FormControl(2, [Validators.required]),
      income: new FormControl(3, [Validators.required]),
      expenses: new FormControl(4, [Validators.required])
    })
  }
  onCreateUser(){
    console.log(this.createUserForm.value);
    this.aws.addUser(this.createUserForm.value);
  }

}
