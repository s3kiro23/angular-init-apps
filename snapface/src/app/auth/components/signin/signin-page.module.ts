import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';
import { SigninRoutingModule } from './signin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SigninComponent],
  imports: [CommonModule, SigninRoutingModule, ReactiveFormsModule],
  exports: [SigninComponent],
})
export class SigninPageModule {}
