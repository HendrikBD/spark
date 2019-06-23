import { ValidatorFn, AbstractControl } from '@angular/forms';

export function passwordConfirmValidator(passwordCtrl: AbstractControl): ValidatorFn {
  return (confirmControl: AbstractControl): {[key: string]: any } | null => {
    const forbidden = passwordCtrl.value !== confirmControl.value;
    return forbidden ? {
      noMatchingPassword: { password: passwordCtrl.value, passwordConfirm: confirmControl.value }
    } : null;
  };
}

export const passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';
