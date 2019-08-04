import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    error: string;
    public config = new MatSnackBarConfig();
  constructor(private router: Router, private authService: AuthenticationService, private snackBar: MatSnackBar) {
      this.config.verticalPosition = 'bottom';
      this.config.horizontalPosition = 'right';
      this.config.duration = 3000;
  }
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit() {
      if (this.authService.isAuthenticated()) {
          this.router.navigateByUrl('/clients');
      }
  }
  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.value)
          .subscribe(res => {
            console.log(res.body);
            this.authService.saveToken(JSON.parse(JSON.stringify(res.body)).token);
            console.log(JSON.parse(localStorage.getItem('user')));
            this.snackBar.open('hello ' + JSON.parse(localStorage.getItem('user')).firstName, 'ok', this.config);
            this.router.navigateByUrl('home');
          }, err => {
            this.error = err.error.message;
            console.log(err);
          });
    }
  }

}
