import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { LabelComponent } from './label/label/label.component';
import { SuffixComponent } from './label/suffix/suffix.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { TextfieldComponent } from './input/textfield/textfield.component';

@NgModule({
  declarations: [
    FormComponent,
    FormGroupComponent,
    LabelComponent,
    SuffixComponent,
    FormFieldComponent,
    TextfieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FormComponent,
    FormGroupComponent,
    LabelComponent,
    SuffixComponent,
    FormFieldComponent,
    TextfieldComponent
  ]
})
export class NgDynamicFormsModule { }
