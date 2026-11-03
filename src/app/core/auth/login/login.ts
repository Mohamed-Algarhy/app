import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  MessageLogErr = signal(``);

  MessageErr = signal<string>('');

  FormLogin: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  submitLogin() {
    if (this.FormLogin.valid) {
      console.log(this.FormLogin.value);
      this.auth.signIn(this.FormLogin.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem(`usertoken`, res.data.token);
          localStorage.setItem('userData', JSON.stringify(res.data.user));
          this.auth.userData.set(res.data.user);

          this.router.navigate([`/feed`]);
        },
        error: (err) => {
          console.log(err.error.message);
          this.MessageLogErr.set(err.error.message);
        },
      });
    } else {
      this.FormLogin.markAllAsTouched();
    }
  }
}
//
