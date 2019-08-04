import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import '../polyfills';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../material-module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ClientsComponent } from './clients/clients.component';
import { PostClientComponent } from './post-client/post-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import {LoaderService} from './services/loader.service';
import {LoaderInterceptor} from './interceptors/loader.interceptor';
import { LoaderComponent } from './loader/loader.component';
import {ListClientInvoicesComponent} from './invoice/list-client-invoices/list-client-invoices.component';
import { EditInvoiceComponent } from './invoice/edit-invoice/edit-invoice.component';
import { AddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ClientsComponent,
    PostClientComponent,
    EditClientComponent,
    LoaderComponent,
    ListClientInvoicesComponent,
    EditInvoiceComponent,
    AddInvoiceComponent
  ],
  imports: [
    HttpClientModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,

  ],
  providers: [LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent, PostClientComponent, EditClientComponent, AddInvoiceComponent, EditInvoiceComponent ],

})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
