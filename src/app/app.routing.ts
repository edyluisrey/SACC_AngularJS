/*
GLORIA GALLEGO
EDY AGUIRRE
MWA FINAL PROJECT
27-09-2017
*/


import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { AnimalComponent } from './animal/animal.component';

import { AuthGuard } from './auth/auth-guard.service';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';
import { DewormComponent } from './deworm/deworm.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { MicrochipComponent } from './microchip/microchip.component';
import { LocationComponent } from './location/location.component';
import { PhoneComponent } from './phone/phone.component';
import { EmailComponent } from './email/email.component';

const routes: Routes =[
  { path: 'home', component: HomeComponent  },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'user/location/:id',  component: LocationComponent ,canActivate: [AuthGuard] },
    { path: 'user/phone/:id',  component: PhoneComponent ,canActivate: [AuthGuard] },
    { path: 'user/email/:id',  component: EmailComponent ,canActivate: [AuthGuard] },
    { path: 'animal',  component: AnimalComponent ,canActivate: [AuthGuard] },
    { path: 'animal/deworm/:id',  component: DewormComponent ,canActivate: [AuthGuard] },
    { path: 'animal/vaccine/:id',  component: VaccineComponent ,canActivate: [AuthGuard] },
    { path: 'animal/microchip/:id',  component: MicrochipComponent ,canActivate: [AuthGuard] },
    { path: '',          redirectTo: 'home', pathMatch: 'full' },
    { path: 'callback', component: CallbackComponent}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
