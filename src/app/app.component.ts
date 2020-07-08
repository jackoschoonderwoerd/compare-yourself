import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'compare-yourself';
  
  appForm: FormGroup

  ngOnInit() {
    this.appForm = new FormGroup({
     name: new FormControl(null, [])
    })
  }
}
