import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ERROR_MESSAGES } from 'src/app/model/enum/error-messages';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private fb: FormBuilder) { }
  public errorMessages = ERROR_MESSAGES;

  private roomInfo = this.fb.group({
    personName: ['', Validators.required],
    roomName: ['', Validators.required]
  });

  getRoomInfo() {
    return this.roomInfo;
  }
}
