import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  loginError = '';
  submitted = false;
  private returnUrl = '/flights'; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute ,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl')
      || '/flights';

    if (this.authService.isLoggedIn()) {

    this.notificationService.warning(
      'Already LoggedIn!'
    );
    
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  login(): void {
    this.submitted = true;
    this.loginError = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    const success = this.authService.login(
      email,
      password
    );

    if (!success) {
      this.loginError = 'Invalid email or password.';
      return;
    }

    // Login successful
    
    this.notificationService.success(
      'Login successful. Welcome back!'
    );

    this.router.navigateByUrl(this.returnUrl);
  }
}