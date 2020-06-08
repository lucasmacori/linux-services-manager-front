import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card'; 
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FavoriteServicesComponent } from '../views/favorite-services/favorite-services.component';
import { ServicesTableComponent } from '../components/services-table/services-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from 'src/services/service.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { LoginComponent } from '../views/login/login.component';
import { ConfigService } from 'src/services/config.service';

@NgModule({
  declarations: [
    AppComponent,
    FavoriteServicesComponent,
    ServicesTableComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSlideToggleModule
  ],
  providers: [
    ConfigService,
    AuthService,
    ServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
