import { Directive, OnInit, Input, Output, EventEmitter, Optional } from '@angular/core';
import { FormGroup, ValidatorFn, AsyncValidatorFn, ControlContainer, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { FormService } from '../form/form.service';
import { takeUntil, filter } from 'rxjs/operators';
import { DestroyService } from '../shared/destroy.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'ngx-form-field-control',
  providers: [ DestroyService ]
})
export class FormFieldControlDirective<T> implements OnInit {
  private systemValue: T;
  private controlDisabled: boolean;

  public form = new FormGroup({});
  public controlLocked = false;
  public isStandaloneControl = false;
  public valueSavedInForm = false;

  get disabled(): boolean {
    return this.controlDisabled;
  }

  @Input()
  set disabled(isDisabled: boolean) {
    this.controlDisabled = isDisabled;
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input()
  public controlName: string;

  @Output()
  public commit = new EventEmitter();

  get value(): T {
    return this.systemValue;
  }

  @Input()
  set value(newValue: T) {
    this.systemValue = newValue;
    if (this.isControlUnlocked()) {
      this.form.patchValue({ [this.controlName]: newValue });
    }
  }

  @Input()
  public validators: ValidatorFn[];

  @Input()
  public asyncValidators: AsyncValidatorFn[];

  constructor(
    @Optional() private readonly rootFormContainer: ControlContainer,
    @Optional() public readonly formService: FormService,
    private readonly destroy$: DestroyService
  ) {
    if (this.hasNoSharedFormServiceInstance()) {
      this.formService = new FormService();
    }
  }

  private hasNoSharedFormServiceInstance(): boolean {
    return !this.formService;
  }

  private isControlUnlocked(): boolean {
    return !this.controlLocked;
  }

  public ngOnInit(): void {
    this.initializeForm();
    this.registerSubscriptions();
  }

  private initializeForm(): void {
    this.initializeParentForm();
    this.form.addControl(
      this.controlName, new FormControl(
        {
          value: this.value,
          disabled: this.disabled
        },
        this.validators,
        this.asyncValidators
      )
    );
  }

  private initializeParentForm(): void {
    if (this.rootFormContainer) {
      this.form = this.rootFormContainer.control as FormGroup;
    } else {
      this.isStandaloneControl = true;
    }
  }

  private registerSubscriptions(): void {
    this.subscribeToLockedStatusChanges();
    this.subscribeToResetEvents();
    this.subscribeToCommitEvents();
    this.subscribeToDisabledStatusChanges();
  }

  private subscribeToLockedStatusChanges(): void {
    this.formService.locked$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLocked: boolean) => this.controlLocked = isLocked);
  }

  private subscribeToResetEvents(): void {
    this.formService.reset$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.resetControl());
  }

  private subscribeToCommitEvents(): void {
    this.formService.committed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.formValueDiffersFromSystemValue()) {
          // needed?
        }
      });
  }

  private formValueDiffersFromSystemValue(): boolean {
    return this.formControl.value !== this.value;
  }

  private subscribeToDisabledStatusChanges(): void {
    this.form.statusChanges
      .pipe(
        takeUntil(this.destroy$),
        filter((status) => status === 'DISABLED')
      )
      .subscribe(() => {
        this.controlLocked = false;
      });
  }

  public onControlGainedFocus(): void {
    this.formService.updateLockedState(true);
  }

  public onControlLostFocus(): void {
    const rootForm = this.getRootForm();
    if (!this.valueSavedInForm && rootForm.pristine) {
      this.formService.triggerReset();
    }

    this.submitFormControl();
  }

  private getRootForm(): FormGroup | FormArray {
    let rootForm: FormGroup | FormArray = this.form;
    while (rootForm.parent != null) {
      rootForm = rootForm.parent;
    }
    return rootForm;
  }

  private resetControl(): void {
    this.valueSavedInForm = false;
    this.formControl.reset(this.value);
    this.formService.updateLockedState(false);
  }

  public submitFormControl(): void {
    if (this.formControlValid || this.valueSavedInForm) {
      this.valueSavedInForm = true;
      this.formControl.markAsPristine({ onlySelf: true });

      if (this.isStandaloneControl) {
        this.formService.triggerCommit();
        this.commit.emit(this.formControl.value);
      }
    }
  }

  get formControlValid(): boolean {
    return this.formControl.dirty && this.formControl.valid;
  }

  get formControlInvalid(): boolean {
    return this.formControl.dirty && this.formControl.invalid;
  }

  get formControl(): AbstractControl {
    return this.form.get(this.controlName);
  }
}
