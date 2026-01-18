import { FormControl, ValidationErrors } from '@angular/forms';

export class Luv2ShopValidators {
  // whitespace validation
  static notContainsWhiteSpace(control: FormControl): ValidationErrors | null {
    // check if string only contains whitespace`);
    if (control.value == null || control.value.trim().length === 0) {
      return { notContainsWhiteSpace: true };
    }
    return null;
  }
}
