import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { error } from 'node:console';
import { Auth } from '../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  MessageErr = signal(``);
  private readonly router = inject(Router)
  private readonly auth = inject(Auth);
  FormRegister: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required, Validators.pattern(/^[male|female]+$/)]),
      password: new FormControl(null, [Validators.required]),
      rePassword: new FormControl(null, [Validators.required]),
    },
    this.confirmPassword,
  );

  submitRegister() {
    if (this.FormRegister.valid) {
      // submite buttom is valid is here ====================
      console.log(this.FormRegister.value);
      this.auth.signUp(this.FormRegister.value).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate([`/login`])
        },
        error: (err) => {
          console.log(err.error.message);
          this.MessageErr.set(err.error.message)
        },
      });
    } else {
      this.FormRegister.markAllAsTouched();
    }
  }
  // pass and repass is matched
  confirmPassword(x: AbstractControl) {
    let passwordValu = x.get(`password`)?.value;
    let rePasswordValu = x.get(`rePassword`)?.value;
    if (passwordValu != rePasswordValu) {
      // x.get(`rePassword`)?.setErrors({`misMatched` : true})
      // return{`misMatched`:true}
      x.get(`rePassword`)?.setErrors({ misMatched: true });
      return { misMatched: true };
    } else {
      return null;
    }
  }
}


