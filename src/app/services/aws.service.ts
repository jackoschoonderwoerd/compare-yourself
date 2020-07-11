import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../components/auth/auth.service';
import { UserData } from 'amazon-cognito-identity-js';
import { UserProperties } from '../models/user-properties.models';




@Injectable({
  providedIn: 'root'
})
export class AwsService {

  url: string = 'https://5k3ute071i.execute-api.eu-central-1.amazonaws.com/dev/compare-yourself';
  userIdsEmitter = new EventEmitter<any>();
  ;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUser(type, id) {
    console.log(id);
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        console.log(err);
      } else {
        const queryParamAccessToken = '?' + 'accessToken=' + session.getAccessToken().getJwtToken();
        const queryParamUserId = '&' + 'userId=' + id;
        this.http.get(this.url + '/' + type + queryParamAccessToken + queryParamUserId, {
          headers: new HttpHeaders({ 'Authorization': session.getIdToken().getJwtToken() })
        }).subscribe((response: any) => {
          this.userIdsEmitter.emit(response);
          console.log(response);
        });
      }
    });
  }

  addUser(userProperties: UserProperties) {
    console.log(userProperties);
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        console.log(err);
        return;
      }
      return this.http.post(this.url, userProperties, {
        headers: new HttpHeaders({ 'Authorization': session.getIdToken().getJwtToken() })
      }).subscribe(
        (error) => {
          console.log(error);
        },
        (result) => {
          console.log(result)
        })
    })
  }


  deleteUser(userId) {
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        console.log(err);
        return;
      } else {
        const queryParamUserId = 'userId=' + userId
        return this.http.delete(this.url + '?' + queryParamUserId, {
          headers: new HttpHeaders({ 'Authorization': session.getIdToken().getJwtToken() })
        }).subscribe(result => {
          console.log(result);
        });
      }
    });
  }
}
