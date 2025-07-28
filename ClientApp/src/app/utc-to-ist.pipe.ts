import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcToIst',
  standalone: true,
})
export class UtcToIstPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';
    const utcDate = new Date(value);
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(utcDate.getTime() + istOffset);
    return istDate.toLocaleString('en-IN', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    });
  }
}
