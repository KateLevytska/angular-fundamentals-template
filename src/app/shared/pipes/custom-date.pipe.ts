import { Pipe } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe {
    transform(minutes: number): string {
        return this.getCourseDuration(minutes);
    }

    getCourseDuration(minutes: number): string {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        const hh = hours < 10 ? `0${hours}` : `${hours}`;
        const mm = mins < 10 ? `0${mins}` : `${mins}`;
        const suffix = hours === 1 ? 'hour' : 'hours';

        return `${hh}:${mm} ${suffix}`;
    }
}
