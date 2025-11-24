import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './users-management.html',
  styleUrls: ['./users-management.css'],
  standalone: true,
})
export class UsersManagement implements OnInit {
  users = signal<UserRecord[]>([]);
  loadError = signal<string | null>(null);
  editingId = signal<number | null>(null);
  draftFullName = signal<string>('');
  draftEmail = signal<string>('');
  draftPassword = signal<string>('');
  currentUserId = signal<number | null>(null);

  ngOnInit(): void {
    this.loadUsers();
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    try {
      const raw = localStorage.getItem('currentUser');
      if (raw) {
        const parsed = JSON.parse(raw);
        this.currentUserId.set(parsed.userId || null);
      }
    } catch {
      this.currentUserId.set(null);
    }
  }

  isCurrentUser(userId: number): boolean {
    return this.currentUserId() === userId;
  }

  loadUsers(): void {
    try {
      this.loadError.set(null);
      const raw = localStorage.getItem('users');
      if (!raw) {
        this.users.set([]);
        return;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        this.users.set(parsed);
      } else {
        this.users.set([]);
      }
    } catch {
      this.loadError.set('Failed to read stored users');
      this.users.set([]);
    }
  }

  startEdit(user: UserRecord): void {
    this.editingId.set(user.userId);
    this.draftFullName.set(user.fullName);
    this.draftEmail.set(user.email);
    this.draftPassword.set(user.password);
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.draftFullName.set('');
    this.draftEmail.set('');
    this.draftPassword.set('');
  }

  saveEdit(userId: number): void {
    const list = [...this.users()];
    const idx = list.findIndex(u => u.userId === userId);
    if (idx === -1) return;
    list[idx] = {
      ...list[idx],
      fullName: this.draftFullName() || list[idx].fullName,
      email: this.draftEmail() || list[idx].email,
      password: this.draftPassword() || list[idx].password,
    };
    this.updateUsers(list);
    this.cancelEdit();
  }

  deleteUser(userId: number): void {
    this.updateUsers(this.users().filter(u => u.userId !== userId));
    const current = localStorage.getItem('currentUser');
    if (current) {
      const parsed = this.safeParse(current);
      if (parsed && parsed.userId === userId) {
        localStorage.removeItem('currentUser');
      }
    }
  }

  private safeParse(raw: string): any {
    return JSON.parse(raw);
  }

  private updateUsers(list: UserRecord[]): void {
    this.users.set(list);
    localStorage.setItem('users', JSON.stringify(list));
  }
}

interface UserRecord {
  userId: number;
  fullName: string;
  email: string;
  password: string;
}
