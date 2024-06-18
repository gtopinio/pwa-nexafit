import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { fade1s, shake } from "../../../libraries/animation";
import { Observable } from "rxjs";

@Component({
  selector: 'app-form-body',
  templateUrl: './form-body.component.html',
  styleUrls: ['./form-body.component.css'],
  animations: [
    fade1s,
    shake
  ]
})
export class FormBodyComponent implements OnInit {
  @Output() formChange = new EventEmitter();
  @Output() formSubmit = new EventEmitter();
  @Input() clearForm: Observable<any> = new Observable<any>();

  registrationForm = this._formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    birthday: ['', [Validators.required]]
  });

  termsOfService= 'Terms of Service';
  privacyPolicy= 'Privacy Policy';
  isSubmitting: boolean = false;
  nextPage: boolean = false;
  maxDate = new Date();

  constructor(
    private _formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.onFormChangeHandler();
    this.clearForm.subscribe(() => {
      this.registrationForm.reset();
      this.nextPage = false;
    });
  }

  onFormChangeHandler() {
    this.registrationForm.valueChanges.subscribe(() => {
      this.formChange.emit(this.registrationForm);
    });
  }

  onNextPageHandler() {
    const emailControl = this.registrationForm.get('email');

    if(emailControl && emailControl.valid){
      this.nextPage = true;
    } else {
      this.shakeInvalidControls();
    }
  }

  onPreviousPageHandler() {
    this.registrationForm.reset();
    this.nextPage = false;
  }

  onSubmitHandler() {
    if (this.registrationForm.valid) {
      this.isSubmitting = true;
      this.formSubmit.emit(this.registrationForm.value);
      setTimeout(() => {
        this.isSubmitting = false;
      }, 1000);
    }
    else {
      this.shakeInvalidControls();
    }
  }

  shakeInvalidControls() {
    Object.keys(this.registrationForm.controls).forEach(key => {
      const control = this.registrationForm.get(key);
      if (control && control.invalid) {
        control.markAsUntouched();
        setTimeout(() => {
          control.markAsTouched();
        }, 100);
      }
    });
  }

}
