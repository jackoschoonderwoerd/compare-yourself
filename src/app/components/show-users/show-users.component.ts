import { Component, OnInit } from '@angular/core';
import { AwsService } from 'src/app/services/aws.service';
import { UserProperties } from 'src/app/models/user-properties.models';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent implements OnInit {

  // usersPanelOpenState: boolean = false;
  userPanelOpenState: boolean;
  users;
  singleUser;
  postResponse;
  deleteResponse;
  ids
  user
  userDetailForm: FormGroup;
  editMode: boolean = false;

  userProperties: UserProperties = {
    "age": 19,
    "height": 74,
    "income": 101,
    "expenses": 24
  }
  showUsersList: boolean = false;

  constructor(
    private aws: AwsService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.onGetUser('all', '')
    this.aws.userIdsEmitter.subscribe(response => {
      if (response.Item) {
        this.user = response.Item;
        this.initUserDetailForm();
      } else {
        console.log('ids')
        this.ids = response;
      }
    });
  }

  onGetUser(type, id) {
    this.aws.getUser(type, id);
  }

  onDeleteUser(userId) {
    console.log(userId);
    this.aws.deleteUser(userId);
    this.ids = this.ids.filter(id => {
      return id !== userId;
    })
  }

  initUserDetailForm() {
    this.userDetailForm = this.fb.group({
      age: new FormControl({ value: this.user.age, disabled: true }, [Validators.required]),
      height: new FormControl({ value: this.user.height, disabled: true }, [Validators.required]),
      income: new FormControl({ value: this.user.income, disabled: true }, [Validators.required]),
      expenses: new FormControl({ value: this.user.expenses, disabled: true }, [Validators.required]),
      userId: new FormControl({ value: this.user.UserId, disabled: true }, [Validators.required])
    })
  }

  enableEditing() {
    if (this.editMode) {
      this.editMode = false;
      this.userDetailForm.disable();
    } else {
      this.userDetailForm.enable();
      this.editMode = true;
      // this.userDetailForm.controls.age.enable();
      // this.userDetailForm.controls.height.enable();
      // this.userDetailForm.controls.income.enable();
      // this.userDetailForm.controls.expenses.enable();
      // this.userDetailForm.controls.userId.enable();
    }
  }

  onSaveEdits() {
    const userProperties = new UserProperties(
      this.userDetailForm.value.age,
      this.userDetailForm.value.height,
      this.userDetailForm.value.income,
      this.userDetailForm.value.expenses,
      this.userDetailForm.value.userId
    )
    this.aws.addUser(userProperties);
    this.user = new UserProperties(
      this.userDetailForm.value.age,
      this.userDetailForm.value.height,
      this.userDetailForm.value.income,
      this.userDetailForm.value.expenses,
      this.userDetailForm.value.userId);
    this.initUserDetailForm();
  }
  onCancelEdits() {
    console.log(this.user);
    this.initUserDetailForm();
    this.editMode = false;
  }

  // toggleUsersPanelOpenState() {
  //   this.usersPanelOpenState = !this.usersPanelOpenState;
  //   console.log(this.usersPanelOpenState);
  // }
  toggleUserPanelOpenState() {
    this.userDetailForm.disable();
    this.editMode = false;
  }

 
}
