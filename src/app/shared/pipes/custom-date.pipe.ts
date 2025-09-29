import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customDate' })

export class CustomDatePipe implements PipeTransform {
  transform(date: Date | string | null | undefined): string {
    if (date == null) return '';

    if (date instanceof Date && !isNaN(date.getTime())) {
      return format(date);
    }

    const s = String(date).trim();
    if (!s) return '';

    if (s.includes('-') && !isNaN(Date.parse(s))) {
      return format(new Date(s));
    }

    const parts = s.split(/[\/\.]/);
    if (parts.length === 3) {
      const [dStr, mStr, yStr] = parts;
      const d = parseInt(dStr, 10);
      const m = parseInt(mStr, 10);
      const y = parseInt(yStr, 10);
      if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
        return format(new Date(y, m - 1, d));
      }
    }

    return s;

    function format(dt: Date): string {
      const dd = String(dt.getDate()).padStart(2, '0');
      const mm = String(dt.getMonth() + 1).padStart(2, '0');
      const yyyy = dt.getFullYear();
      return `${dd}.${mm}.${yyyy}`;
    }
  }
}
