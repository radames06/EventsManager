import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector: '[appPasswordsIdentical]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PasswordsIdenticalValidatorDirective, multi: true }]
})
export class PasswordsIdenticalValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors {
        if (control.get('password') != null && control.get('passwordConf') != null) {
            return control.get('password').value != control.get('passwordConf').value ? { 'passwordsIdentical': true } : null;
        } else {
            return { 'passwordsIdentical': true };
        }
    }
}