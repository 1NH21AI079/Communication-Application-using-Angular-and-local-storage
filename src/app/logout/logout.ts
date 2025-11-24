import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrls: ['./logout.css'],
  standalone: true,
})
export class Logout implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Clear the current user from localStorage
    localStorage.removeItem('currentUser');
    
    // Redirect to welcome page
    this.router.navigate(['/welcome']);
  }
}
