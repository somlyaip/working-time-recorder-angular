import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Time } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from '../controls/button/button.component';

@Component({
  selector: 'app-input-time-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './input-time-modal.component.html',
})
export class InputTimeModalComponent {
  public isOpen = false;
  public timeForm: FormGroup;

  callback?: (time: Time) => void;

  constructor(private formBuilder: FormBuilder) {
    this.timeForm = this.formBuilder.group({
      hours: ['', Validators.required],
      minutes: ['', Validators.required],
    });
  }

  show(callback: (time: Time) => void) {
    this.isOpen = true;
    this.callback = callback;

    const now = new Date();
    this.timeForm.setValue({
      hours: now.getHours().toString().padStart(2, '0'),
      minutes: now.getMinutes().toString().padStart(2, '0'),
    });
  }

  close() {
    this.isOpen = false;
  }

  ok() {
    this.close();

    if (this.timeForm.valid) {
      if (typeof this.callback != 'function') {
        console.error(
          `callback is not a function. It is: '${typeof this.callback}'`,
        );
        return;
      }

      this.callback({
        hours: Number(this.timeForm.value.hours),
        minutes: Number(this.timeForm.value.minutes),
      });
    }
  }

  isFieldValid(formFieldName: string) {
    const formFieldControl = this.timeForm.controls[formFieldName];
    return (
      formFieldControl.invalid &&
      (formFieldControl.dirty || formFieldControl.touched)
    );
  }
}
