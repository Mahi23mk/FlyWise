import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService, User } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  signUpError = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private notificationService: NotificationService ){
    this.signUpForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        password: ['', [
          Validators.required,
          Validators.minLength(6)
        ]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password && confirmPassword && password !== confirmPassword) return {passwordMismatch: true};

    return null;
  }

  signUp(){

    if (this.signUpForm.invalid) {
        this.signUpForm.markAllAsTouched();
        return;
    }
    
    const user :User = {
      id: '001',
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    }

    const success = this.authService.signUp(user);

    if(!success){
      this.signUpError = 'An account already exists.';
      return;
    }

    this.notificationService.success(
      'Account created successfully. Welcome to Flight Planner!'
    );

    this.router.navigate(['/flights']);

  }
}
