import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CustomAngularMaterialModule } from './angular-material.modules';
import { AppComponent } from './components/app/app.component';
import { InputComponent } from './components/input/input.component';
import { ApiService } from './service/api/api.service';
import { FormService } from './service/form/form.service';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CustomAngularMaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    FormBuilder,
    ApiService,
    FormService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
