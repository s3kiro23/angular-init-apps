import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginPreview$!: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      },
      {
        updateOn: 'blur',
      }
    );

    this.loginPreview$ = this.loginForm.valueChanges.pipe(
      tap((formValue) => console.log(formValue))
    );
  }

  onLogin() {
    console.log(this.loginForm.value);
    this.auth.login()
    this.router.navigateByUrl('/facesnaps')
  }
}
