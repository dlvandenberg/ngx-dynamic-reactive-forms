import { Component, OnInit, Output, EventEmitter, HostListener, forwardRef } from '@angular/core';
import { ControlContainer, FormGroup, AbstractControl } from '@angular/forms';
import { FormService } from './form.service';

@Component({
  selector: 'ngx-form',
  templateUrl: './form.component.html',
  providers: [
    FormService,
    { provide: ControlContainer, useExisting: forwardRef(() => FormComponent) }
  ]
})
export class FormComponent extends ControlContainer {

  public form = new FormGroup({});

  @Output()
  public commit = new EventEmitter();

  /**
   * Prevent default form behavior where the
   * form is submitted when ENTER is pressed
   * in a control. We only want to submit
   * when a button of type='submit' is clicked.
   */
  @HostListener('keydown.enter', [ '$event' ])
  public onEnter(event: KeyboardEvent): void {
    event.preventDefault();
  }

  constructor(private readonly formService: FormService) {
    super();
  }

  public commitForm(): void {
    this.commit.emit(this.form.value);
    this.formService.triggerCommit();
  }

  get control(): AbstractControl | null {
    return this.form;
  }
}
