import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FormService {

  private lockedSource = new Subject<boolean>();
  /**
   * Observable which is triggered when the 'updateLockedState(boolean)'
   * method is called with a new boolean value. Each subscriber will
   * be notified.
   */
  public locked$ = this.lockedSource.asObservable();

  private resetSource = new Subject<void>();
  /**
   * Observable which is triggered when the 'triggerReset()' method
   * is called. Each subscriber will be notified that a reset must be done.
   */
  public reset$ = this.resetSource.asObservable();

  private committedSource = new Subject<void>();
  /**
   * Observable which is triggered when the 'triggerCommit()' method
   * is called. Each subscriber will be notified that a commit has been done.
   */
  public committed$ = this.committedSource.asObservable();

  /**
   * Updates the locked state of the form/group to the
   * specified value. Emits the value to the Subject.
   *
   * @param isLocked  boolean which specified the locked state
   */
  public updateLockedState(isLocked: boolean): void {
    this.lockedSource.next(isLocked);
  }

  /**
   * Triggers a reset by emitting a void value to the Subject.
   */
  public triggerReset(): void {
    this.resetSource.next();
  }

  /**
   * Triggers a committed event by emitting a void value to the Subject();
   */
  public triggerCommit(): void {
    this.committedSource.next();
  }

}
