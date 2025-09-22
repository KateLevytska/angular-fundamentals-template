import { Pipe } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe {
    transform(date: Date | string): string {
        let dateStr: string;
        if (date instanceof Date) {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            dateStr = `${day}.${month}.${year}`;
        } else {
            const [day, month, year] = date.split('/');
            dateStr = `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
        }
        return dateStr;
    }
}
