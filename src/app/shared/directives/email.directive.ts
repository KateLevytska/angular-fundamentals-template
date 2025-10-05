import {
    Directive,
    forwardRef
} from '@angular/core';
import {
    NG_VALIDATORS,
    Validator,
    AbstractControl,
    ValidationErrors
} from '@angular/forms';

@Directive({
    selector: '[emailValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => EmailValidatorDirective),
            multi: true,
        },
    ],
})
export class EmailValidatorDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors | null {
        const raw = control.value;
        if (raw == null || raw === '') {
            return null;
        }

        const value = raw.trim();
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        return emailRe.test(value) ? null : { emailInvalid: true };
    }
}
