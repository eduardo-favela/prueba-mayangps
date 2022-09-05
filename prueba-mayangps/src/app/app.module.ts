import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as bootstrap from 'bootstrap'
import * as $ from 'jquery';
import { RastreoTrComponent } from './rastreo-tr/rastreo-tr.component'
import { NgChartsModule } from 'ng2-charts'
import { DataTablesModule } from 'angular-datatables';

const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'perfil', component: PerfilComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PerfilComponent,
    RastreoTrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    LeafletModule,
    NgChartsModule,
    DataTablesModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
