import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormService } from '../service/form/form.service';

@Injectable({ providedIn: 'root' })
export class FormHelper {
  constructor(public formService: FormService) { }

  public errorClassName = 'error-box';
  public defaultMessage = 'Please update';

  public getControlName(control: AbstractControl): string {
    if (control.parent) {
      const parent = control.parent;
      return Object.keys(parent.controls).find(name => control === parent.controls[name]);
    }
    return '';
  }

  public showError(control: AbstractControl): string {
    let result = '';
    if (!!control && control.invalid && control.touched) {
      result = this.errorClassName;
    }
    return result;
  }
}
