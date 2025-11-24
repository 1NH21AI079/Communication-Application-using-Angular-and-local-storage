import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilteruserPipe } from '../filteruser-pipe';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FilteruserPipe],
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.css'],
})
export class UsersList implements OnInit {
  listFilter: string = '';
  users = signal<UserRow[]>([]);
  loadError = signal<string | null>(null);

  ngOnInit(): void {
    this.loadUsers();
  }

  onFilterChange(val: string) {
    this.listFilter = val;
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
        const mapped = parsed.map((u: any, idx: number) => ({
          id: u.userId ?? idx + 1,
          name: u.fullName ?? u.name ?? 'Unknown',
          email: u.email ?? ''
        }));
        this.users.set(mapped);
      } else {
        this.users.set([]);
      }
    } catch {
      this.loadError.set('Failed to parse users from storage');
      this.users.set([]);
    }
  }
}

interface UserRow { id: number; name: string; email: string; }
