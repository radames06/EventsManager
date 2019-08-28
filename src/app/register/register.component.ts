import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    } else {
      const email = form.value.email;
      const password = form.value.password;
      let authObs: Observable<AuthResponseData>;

      authObs = this.authService.signUp(email, password);
      authObs.subscribe(
        resData => {
          this.router.navigate(['/login']);
        },
        error => {
          this.error = error;
        }
      )
      form.reset();
    }
  }
}