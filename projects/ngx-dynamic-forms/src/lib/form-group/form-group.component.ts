import { Component, OnInit, forwardRef, SkipSelf, Input } from '@angular/core';
import { ControlContainer, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'ngx-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
  providers: [
    { provide: ControlContainer, useExisting: forwardRef(() => FormGroupComponent) }
  ]
})
export class FormGroupComponent extends ControlContainer implements OnInit {

  private groupDisabled = false;
  private parentForm: FormGroup;
  public groupForm = new FormGroup({});

  @Input()
  public name: string;

  get disabled(): boolean {
    return this.groupDisabled;
  }

  @Input()
  set disabled(isDisabled: boolean) {
    this.groupDisabled = isDisabled;
    if (isDisabled) {
      this.groupForm.disable();
    } else {
      this.groupForm.enable();
    }
  }

  constructor(@SkipSelf() private readonly parentFormContainer: ControlContainer) {
    super();
   }

  ngOnInit(): void {
    this.parentForm = this.parentFormContainer.control as FormGroup;
    this.parentForm.addControl(this.name, this.groupForm);
  }

  get control(): AbstractControl | null {
    return this.groupForm;
  }
}
