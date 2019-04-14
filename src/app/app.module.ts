import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WjCoreModule } from 'wijmo/wijmo.angular2.core';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { AppComponent } from './app.component';
import { MatWjInputNumberDirective } from './mat-wj-input-number.directive';

@NgModule({
  declarations: [
    AppComponent,
    MatWjInputNumberDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    WjCoreModule,
    WjInputModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
