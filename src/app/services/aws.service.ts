import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  url: string = 'https://5k3ute071i.execute-api.eu-central-1.amazonaws.com/dev/compare-yourself'

  constructor(
    private http: HttpClient
  ) { }

  getUser(type) {
    console.log(type);
    return this.http.get(this.url + '/' + type);
  }
  addUser(body) {
    return this.http.post(this.url, body)
  }
  deleteUser() {
    return this.http.delete(this.url);
  }


}
