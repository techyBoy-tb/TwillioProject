import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormService } from 'src/app/service/form/form.service';
import { FormHelper } from 'src/app/util/form-helper';

let uniqueId = 0;
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, AfterViewInit {

  @Input() label = 'No label provided';
  @Input() typeOfInput: string;
  @Input() control: FormControl;
  @ViewChild('input') input: ElementRef;

  controlName: string;
  name: string;
  value: string;

  constructor(public formHelper: FormHelper, private formService: FormService) { }

  ngOnInit(): void {
    this.name = 'custom-input' + uniqueId;
    uniqueId++;
    this.controlName = this.formHelper.getControlName(this.control);
    this.setAsNull();
    this.control.markAsUntouched();
    this.control.valueChanges.subscribe(() => {
      this.setAsNull();
    });
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.hidden = true;
  }

  setAsNull() {
    if (this.value === this.formHelper.defaultMessage) {
      this.control.setValue('', { emitEvent: false, onlySelf: true });
      this.control.markAsUntouched();
    }
  }
  getErrorMessage(): Object {
    const errorObj = this.formService.errorMessages[this.controlName];
    let message = 'Message not provided';
    if (this.control.errors) {
      const error = Array.from(Object.keys(this.control.errors))[0];
      message = errorObj[error];
    }
    return message;
  }

  touchedAndInvalid() {
    if (this.control.invalid && this.control.touched) {
      return true;
    } else {
      return false;
    }
  }
}
