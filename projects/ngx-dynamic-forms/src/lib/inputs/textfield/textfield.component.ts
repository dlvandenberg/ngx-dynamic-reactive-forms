import { Component, OnInit } from '@angular/core';
import { FormFieldControlDirective } from '../form-field-control.directive';
import { DestroyService } from '../../shared/destroy.service';

@Component({
  selector: 'ngx-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss'],
  providers: [ DestroyService ]
})
export class TextfieldComponent extends FormFieldControlDirective<string> {
}
