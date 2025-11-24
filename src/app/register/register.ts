import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: true,
})
export class Register implements OnInit {
  userForm!: FormGroup;
  users: any[] = [];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, { validators: this.passwordsMatchValidator });
  const saveUsers = localStorage.getItem('users');
    this.users = saveUsers ? JSON.parse(saveUsers) : [];
  }

  onSubmit(){
    if(this.userForm.valid)
    {
      alert("Form is submitted");
      const newUser = {
        userId: this.users.length > 0 ? this.users[this.users.length - 1].userId + 1 : 1,
        ...this.userForm.value
      };
      this.users.push(newUser);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.userForm.reset();
      this.router.navigate(['/login']);
    }
  }

  private passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    if (password && confirm && password !== confirm) {
      return { passwordsMismatch: true };
    }
    return null;
  }
}
