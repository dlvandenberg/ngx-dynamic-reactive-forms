import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public data = {
    group: {
      field1: 0,
      field2: 0,
    },
    field3: 0,
    field4: 0
  };

  public noFormValue = 0;
  public form = new FormGroup({});

  public commitValue(value: any): void {
    console.log(value);
  }
}
