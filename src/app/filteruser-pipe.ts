import { Pipe, PipeTransform } from '@angular/core';

interface User { id: number; name: string; email: string; }

@Pipe({
  name: 'filteruser',
  standalone: true
})
export class FilteruserPipe implements PipeTransform {
  transform(value: User[] | null | undefined, filter: string | null | undefined): User[] {
    if (!value || value.length === 0) return [];
    const term = (filter ?? '').trim().toLowerCase();
    if (!term) return value;
    return value.filter(u => u.name.toLowerCase().includes(term));
  }
}
