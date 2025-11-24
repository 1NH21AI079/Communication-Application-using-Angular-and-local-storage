import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  userName: string;
  message: string;
  timestamp: Date;
}

@Component({
  selector: 'app-group-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './group-chat.html',
  styleUrls: ['./group-chat.css'],
  standalone: true,
})
export class GroupChat implements OnInit {
  currentUserName = signal<string>('Guest');
  currentUserEmail = signal<string>('');
  messages = signal<ChatMessage[]>([]);
  newMessage = signal<string>('');

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadMessages();
  }

  loadCurrentUser(): void {
    try {
      const raw = localStorage.getItem('currentUser');
      if (raw) {
        const parsed = JSON.parse(raw);
        this.currentUserName.set(parsed?.fullName || 'Guest');
        this.currentUserEmail.set(parsed?.email || '');
      }
    } catch {
      this.currentUserName.set('Guest');
    }
  }

  loadMessages(): void {
    try {
      const raw = localStorage.getItem('chatMessages');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Convert timestamp strings back to Date objects
          const messages = parsed.map(m => ({
            ...m,
            timestamp: new Date(m.timestamp)
          }));
          this.messages.set(messages);
        }
      }
    } catch {
      this.messages.set([]);
    }
  }

  sendMessage(): void {
    const msg = this.newMessage().trim();
    if (!msg) return;

    const chatMessage: ChatMessage = {
      userName: this.currentUserName(),
      message: msg,
      timestamp: new Date()
    };

    const updatedMessages = [...this.messages(), chatMessage];
    this.messages.set(updatedMessages);
    
    // Save to localStorage
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    
    // Clear input
    this.newMessage.set('');
  }

  clearChat(): void {
    if (confirm('Are you sure you want to clear all chat messages?')) {
      this.messages.set([]);
      localStorage.removeItem('chatMessages');
    }
  }
}
