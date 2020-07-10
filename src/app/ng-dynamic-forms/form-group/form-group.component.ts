import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class FormGroupComponent implements OnInit {

  @Input()
  public name: string;

  public groupForm = new FormGroup({});

  private parentForm: FormGroup;

  constructor(private readonly ctrlContainer: FormGroupDirective) { }

  public ngOnInit(): void {
    this.parentForm = this.ctrlContainer.form;
    this.parentForm.addControl(this.name, this.groupForm);
  }

}
