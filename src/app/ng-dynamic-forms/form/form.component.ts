import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class FormComponent implements OnInit {

  public form: FormGroup;

  @Output()
  public commit = new EventEmitter();

  constructor(private ctrlContainer: FormGroupDirective) { }

  public ngOnInit(): void {
    this.form = this.ctrlContainer.form;
  }

}
