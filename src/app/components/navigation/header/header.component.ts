import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();

  authStatus: boolean = false;
  sidenavStatus: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log('header onInit()')
    this.authService.authStatusChanged.subscribe(
      (authStatus) => {
        this.authStatus = authStatus;
        console.log('this.authStatus: ', this.authStatus);
      }
    )
    this.authService.isAuthenticated().subscribe(
      data => {
        console.log(data);
        this.authStatus = data;
      });
  }

  onToggleSidenav() {
    console.log('onToggleSidenav()')
    this.sidenavToggle.emit();
  }
  onLogOut() {
    this.authService.logOut();
  }
}
