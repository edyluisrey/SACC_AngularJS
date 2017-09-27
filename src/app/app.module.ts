import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { DbAnimalService } from './db/dbAnimal.service';
import { AppComponent } from './app.component';

import { UserComponent } from './user/user.component';
import { AnimalComponent } from './animal/animal.component';

import { DewormComponent } from './deworm/deworm.component';

import { CallbackComponent } from './callback/callback.component';

import { AuthService } from './auth/auth.service';
import { PersonService } from './db/person.service';
import { AuthGuard } from './auth/auth-guard.service';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { MiddleService } from './Mid.service';
import { HomeComponent } from './home/home.component';
import { MyDatePipe } from './my-date.pipe';
import { VaccineComponent } from './vaccine/vaccine.component';
import { MicrochipComponent } from './microchip/microchip.component';
import { MySearchPipe } from './my-search.pipe';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('token'))
  }), http, options);
}


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AnimalComponent,
    DewormComponent,
    CallbackComponent,
    HomeComponent,
    MyDatePipe,
    VaccineComponent,
    MicrochipComponent,
    MySearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,

  ],
  providers: [DbAnimalService, PersonService, AuthService, AuthGuard,
    MiddleService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
