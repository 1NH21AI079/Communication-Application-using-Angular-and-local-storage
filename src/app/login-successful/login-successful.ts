import { Component, signal, AfterViewInit, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-successful',
  imports: [CommonModule, RouterModule],
  templateUrl: './login-successful.html',
  styleUrls: ['./login-successful.css'],
  standalone: true,
})

export class LoginSuccessful implements AfterViewInit {
  userEmail = signal<string | null>(null);
  showDashboard = signal<boolean>(false);

  constructor(private router: Router, private el: ElementRef) {
    try {
      const raw = localStorage.getItem('currentUser');
      if (raw) {
        const parsed = JSON.parse(raw);
        this.userEmail.set(parsed?.email ?? null);
      }
    } catch {
      this.userEmail.set(null);
    }
  }

  goHome() {
    this.router.navigate(['/welcome']);
  }

  ngAfterViewInit(): void {
    const modalEl: HTMLElement | null = this.el.nativeElement.querySelector('#loginSuccessModal');
    if (modalEl && typeof bootstrap !== 'undefined') {
      const modal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
      modal.show();
      modalEl.addEventListener('hidden.bs.modal', () => {
        this.showDashboard.set(true);
      });
    }
  }
}

declare const bootstrap: any;
