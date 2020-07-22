import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { LabelComponent } from './label/label/label.component';
import { SuffixComponent } from './label/suffix/suffix.component';
import { FormFieldControlDirective } from './inputs/form-field-control.directive';
import { TextfieldComponent } from './inputs/textfield/textfield.component';

@NgModule({
  declarations: [
    FormComponent,
    FormGroupComponent,
    FormFieldComponent,
    LabelComponent,
    SuffixComponent,
    FormFieldControlDirective,
    TextfieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FormComponent,
    FormGroupComponent,
    FormFieldComponent,
    LabelComponent,
    SuffixComponent,
    FormFieldControlDirective,
    TextfieldComponent
  ]
})
export class NgxDynamicFormsModule { }
