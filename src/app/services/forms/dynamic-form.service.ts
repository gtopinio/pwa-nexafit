import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor(
    private _fb: FormBuilder
  ) { }

  createForm(config: FormConfig) : FormGroup {
    const formGroup = this._fb.group({});
    config.fields.forEach(field => {
      if (field.type === 'array') {
        formGroup.addControl(field.name, this._fb.array([]));
      } else {
        formGroup.addControl(field.name, this._fb.control('', field.validators ?? [])); // The array means that the field.validators is optional
      }
    });
    return formGroup;
  }

  addFormArrayItem(formGroup: FormGroup, arrayName: string, config: FormField[]) {
    const array = formGroup.get(arrayName) as FormArray;
    const group = this._fb.group({});
    config.forEach(field => {
      group.addControl(field.name, this._fb.control('', field.validators ?? []));
    });
    array.push(group);
  }

  removeFormArrayItem(formGroup: FormGroup, arrayName: string, index: number): void {
    const array = formGroup.get(arrayName) as FormArray;
    array.removeAt(index);
  }
}
