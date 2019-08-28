import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  error: string = null;

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    } else {
      const email = form.value.email;
      const password = form.value.password;
      let authObs: Observable<AuthResponseData>;

      authObs = this.authService.signIn(email, password);
      authObs.subscribe(
        resData => {
          this.router.navigate(['/events']);
        },
        error => {
          this.error = error;
        }
      )
      form.reset();
    }
  }
}
