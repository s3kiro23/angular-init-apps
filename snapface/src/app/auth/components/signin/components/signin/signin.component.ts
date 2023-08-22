import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signInForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signInForm = this.formBuilder.group(
      {
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        updateOn: 'blur',
      }
    );
  }

  onSubmitSignInForm() {
    this.auth.createNewUser(this.signInForm.value).subscribe({
      error: (error) => {
        this.errorMessage = error.message;
      },
      complete: () => {
        this.auth.login(this.signInForm.value).subscribe({
          error: (error) => {
            this.errorMessage = error.message;
          },
          complete: () => {
            this.router.navigateByUrl('/facesnaps');
          },
        });
      },
    });
  }
}
