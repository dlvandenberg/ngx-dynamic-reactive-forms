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
      field1: '',
      field2: '',
    },
    field3: '',
    field4: ''
  };

  public noFormValue = '';
  public form = new FormGroup({});

  public commitValue(value: any): void {
    console.log(value);
  }
}
