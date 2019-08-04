import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name: string;
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/clients');
    } else {
      this.router.navigateByUrl('/');
    }
  }

  constructor(private router: Router, private authService: AuthenticationService) {
  }
  isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      this.name = JSON.parse(localStorage.getItem('user')).firstName +
          ' ' + JSON.parse(localStorage.getItem('user')).lastName;
    }
    return this.authService.isAuthenticated();
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('home');
  }
}
