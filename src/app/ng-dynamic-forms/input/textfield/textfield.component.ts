import { Component, OnInit, Optional, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormGroup, FormControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { FormGroupComponent } from '../../form-group/form-group.component';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class TextfieldComponent implements OnInit {

  @Input()
  public group: FormGroupComponent;

  @Input()
  public name: string;

  @Input()
  public value: string;

  @Input()
  public validators: ValidatorFn[];
  
  @Input()
  public asyncValidators: AsyncValidatorFn[];

  public form = new FormGroup({});

  constructor(@Optional() private readonly ctrlContainer: FormGroupDirective) { }

  ngOnInit(): void {
    if (this.group) {
      this.form = this.group.groupForm;
    } else if (this.ctrlContainer) {
      this.form = this.ctrlContainer.form;
    }

    this.form.addControl(this.name, new FormControl(this.value, this.validators, this.asyncValidators));
  }

}
