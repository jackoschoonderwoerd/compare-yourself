import { Component, OnInit } from '@angular/core';
import { AwsService } from 'src/app/services/aws.service';
import { UserProperties } from 'src/app/models/user-properties.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usersPanelOpenState: boolean = false;
  userPanelOpenState: string;
  users;
  singleUser;
  postResponse;
  deleteResponse;
  newResult

  userProperties: UserProperties = {
    "age": 19,
    "height": 74,
    "income": 101,
    "expenses": 24
  }
  showUsersList: boolean = false;

  constructor(private aws: AwsService) { }

  ngOnInit(): void {

  }
}
