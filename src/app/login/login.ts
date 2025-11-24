import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
})
export class Login {
  loginForm!: FormGroup;
  users: any[] = [];

  authError: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    const saveUsers = localStorage.getItem('users');
    this.users = saveUsers ? JSON.parse(saveUsers) : [];
  }

  onSubmit() {
    this.authError = null;
    if (!this.loginForm.valid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    const normalizedEmail = (email || '').toLowerCase().trim();
    const user = this.users.find(u => (u.email || '').toLowerCase().trim() === normalizedEmail && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/login-successful']);
    } else {
      this.authError = 'Invalid email or password';
      this.loginForm.get('email')?.markAsTouched();
      this.loginForm.get('password')?.markAsTouched();
    }
  }
}
