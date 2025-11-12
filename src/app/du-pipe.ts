import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'du',
  standalone: true
})
export class DuPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
