import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilteruserPipe } from '../filteruser-pipe';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FilteruserPipe],
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.css'],
})
export class UsersList {
  listFilter = signal<string>('');
  users = [
    { id: 1, name: 'John', email: 'John@gmail.com' },
    { id: 2, name: 'Anna', email: 'anna@gmail.com' },
    { id: 3, name: 'Pawan', email: 'pawan@gmail.com' }
  ];

  onFilterChange(val: string) {
    this.listFilter.set(val);
  }
}
