import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-body',
  templateUrl: './form-body.component.html',
  styleUrls: ['./form-body.component.css']
})
export class FormBodyComponent implements OnInit {

  registrationForm = this._formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    dateOfBirth: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  termsOfService= 'Terms of Service';
  privacyPolicy= 'Privacy Policy';

  constructor(
    private _formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
  }

}
