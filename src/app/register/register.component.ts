import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: string;
  public config = new MatSnackBarConfig();
  constructor(private router: Router, private authService: AuthenticationService, private snackBar: MatSnackBar) {
    this.config.verticalPosition = 'bottom';
    this.config.horizontalPosition = 'right';
    this.config.duration = 3000;
  }
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/clients');
    }
  }
  submit() {
    if (this.form.valid) {
      this.authService.register(this.form.value)
          .subscribe(res => {
            console.log(res);
            this.snackBar.open('Registration succes', 'ok', this.config );
          }, err => {
            console.log(err);
            this.error = err.error['hydra:description'];
          });
    }
  }

}
