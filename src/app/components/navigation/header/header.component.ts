import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();

  sidenavStatus: boolean = false;

  constructor(private autService: AuthService) { }

  ngOnInit(): void {
    this.autService.isAuthenticated().subscribe(result => {
      console.log(result);
    })
  }

  onToggleSidenav() {
    console.log('onToggleSidenav()')
    this.sidenavToggle.emit();
  }
  onLogOut() {
    this.autService.logOut();
  }
}
