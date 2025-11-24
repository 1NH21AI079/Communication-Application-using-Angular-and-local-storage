import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Document {
  id: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadDate: Date;
  fileData: string; // Base64 encoded file data
}

@Component({
  selector: 'app-docs-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './docs-management.html',
  styleUrls: ['./docs-management.css'],
  standalone: true,
})
export class DocsManagement implements OnInit {
  documents = signal<Document[]>([]);
  currentUserName = signal<string>('Guest');
  uploadError = signal<string | null>(null);
  filterType = signal<string>('all');

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadDocuments();
  }

  loadCurrentUser(): void {
    try {
      const raw = localStorage.getItem('currentUser');
      if (raw) {
        const parsed = JSON.parse(raw);
        this.currentUserName.set(parsed?.fullName || 'Guest');
      }
    } catch {
      this.currentUserName.set('Guest');
    }
  }

  loadDocuments(): void {
    try {
      const raw = localStorage.getItem('documents');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const docs = parsed.map(d => ({
            ...d,
            uploadDate: new Date(d.uploadDate)
          }));
          this.documents.set(docs);
        }
      }
    } catch {
      this.documents.set([]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.uploadError.set(null);

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      this.uploadError.set('File size exceeds 10MB limit');
      input.value = '';
      return;
    }

    // Read file as base64
    const reader = new FileReader();
    reader.onload = () => {
      const fileData = reader.result as string;
      const doc: Document = {
        id: Date.now(),
        fileName: file.name,
        fileType: this.getFileExtension(file.name),
        fileSize: file.size,
        uploadedBy: this.currentUserName(),
        uploadDate: new Date(),
        fileData: fileData
      };

      const updatedDocs = [...this.documents(), doc];
      this.documents.set(updatedDocs);
      this.saveDocuments(updatedDocs);
      
      // Clear input
      input.value = '';
    };

    reader.onerror = () => {
      this.uploadError.set('Failed to read file');
      input.value = '';
    };

    reader.readAsDataURL(file);
  }

  getFileExtension(fileName: string): string {
    const parts = fileName.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : 'unknown';
  }

  getFileIcon(fileType: string): string {
    const icons: { [key: string]: string } = {
      'pdf': '📄',
      'doc': '📝',
      'docx': '📝',
      'xls': '📊',
      'xlsx': '📊',
      'csv': '📊',
      'ppt': '📊',
      'pptx': '📊',
      'txt': '📃',
      'png': '🖼️',
      'jpg': '🖼️',
      'jpeg': '🖼️',
      'gif': '🖼️',
      'bmp': '🖼️',
      'svg': '🖼️',
      'zip': '📦',
      'rar': '📦',
      '7z': '📦',
      'mp4': '🎥',
      'avi': '🎥',
      'mov': '🎥',
      'mp3': '🎵',
      'wav': '🎵',
    };
    return icons[fileType] || '📎';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  downloadDocument(doc: Document): void {
    const link = document.createElement('a');
    link.href = doc.fileData;
    link.download = doc.fileName;
    link.click();
  }

  deleteDocument(id: number): void {
    if (confirm('Are you sure you want to delete this document?')) {
      const updatedDocs = this.documents().filter(d => d.id !== id);
      this.documents.set(updatedDocs);
      this.saveDocuments(updatedDocs);
    }
  }

  getFilteredDocuments(): Document[] {
    const filter = this.filterType();
    if (filter === 'all') return this.documents();
    return this.documents().filter(d => d.fileType === filter);
  }

  getUniqueFileTypes(): string[] {
    const types = this.documents().map(d => d.fileType);
    return Array.from(new Set(types)).sort();
  }

  getTotalSize(): number {
    return this.documents().reduce((sum, doc) => sum + doc.fileSize, 0);
  }

  private saveDocuments(docs: Document[]): void {
    localStorage.setItem('documents', JSON.stringify(docs));
  }
}
