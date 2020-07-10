import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgDynamicFormsModule } from './ng-dynamic-forms/ng-dynamic-forms.module';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgDynamicFormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
