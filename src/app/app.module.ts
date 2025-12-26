import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SkuMastersComponent } from './pages/sku-masters/sku-masters.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CategoriesComponent } from './pages/categories/categories.component';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true }
  ],

  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SkuMastersComponent,
    UsersComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
