import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'compare-yourself';
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    console.log('app.component onInit()');
    this.authService.initAuth();
  }
}
