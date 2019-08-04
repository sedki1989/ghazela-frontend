import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ListClientInvoicesComponent} from './invoice/list-client-invoices/list-client-invoices.component';
import {ClientsComponent} from './clients/clients.component';
import {AppComponent} from './app.component';
const routes: Routes = [
  { path: 'clients', component: ClientsComponent},
  { path: 'home', component: AppComponent},
  { path: 'invoices/:id/:client', component: ListClientInvoicesComponent },
  { path: 'login', component: LoginComponent },
  { path : '', redirectTo : '/login', pathMatch : 'full'},
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
