import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { fade1s, shake } from "../../../libraries/animation";

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

  registrationForm = this._formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    birthday: ['', [Validators.required]]
  });

  termsOfService= 'Terms of Service';
  privacyPolicy= 'Privacy Policy';

  nextPage: boolean = false;

  maxDate = new Date();

  constructor(
    private _formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.onFormChangeHandler();
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
      this.registrationForm.controls.email.markAsUntouched();
      setTimeout(() => {
        this.registrationForm.controls.email.markAsTouched();
      });
    }
  }

  onPreviousPageHandler() {
    this.registrationForm.reset();
    this.nextPage = false;
  }

}
