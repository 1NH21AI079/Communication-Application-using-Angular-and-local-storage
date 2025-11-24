import { Component, AfterViewInit, signal, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-successful',
  imports: [CommonModule],
  templateUrl: './register-successful.html',
  styleUrls: ['./register-successful.css'],
  standalone: true,
})

export class RegisterSuccessful implements AfterViewInit {
  userEmail = signal<string | null>(null);

  constructor(private el: ElementRef) {
    try {
      const rawUsers = localStorage.getItem('users');
      if (rawUsers) {
        const users = JSON.parse(rawUsers);
        const last = users[users.length - 1];
        this.userEmail.set(last?.email ?? null);
      }
    } catch {
      this.userEmail.set(null);
    }
  }

  ngAfterViewInit(): void {
    const modalEl: HTMLElement | null = this.el.nativeElement.querySelector('#registerSuccessModal');
    if (modalEl && typeof bootstrap !== 'undefined') {
      const modal = new bootstrap.Modal(modalEl, { backdrop: 'static', keyboard: false });
      modal.show();
    }
  }
}

declare const bootstrap: any;
