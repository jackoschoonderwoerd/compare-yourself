import { Component, OnInit } from '@angular/core';
import { AwsService } from 'src/app/services/aws.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users;
  singleUser;
  postResponse;
  deleteResponse;

  body = {
    "age": 17,
    "height": 74,
    "income": 100,
    "expenses": 24
  }

  constructor(private aws: AwsService) { }

  ngOnInit(): void {}

  onAddUser() {
    this.aws.addUser(this.body)
  }

  onGetUser(type, UserId) {
    this.aws.getUser(type).subscribe((response: any) => {
      if(response.Items) {
        this.users = response.Items;
        this.singleUser = null;
      } else {
        this.singleUser = response.Item;
        this.users = [];
      }
    })
  }

  onDeleteUser() {
    this.aws.deleteUser().subscribe(response => {
      this.deleteResponse = response;
    })
  }
}
