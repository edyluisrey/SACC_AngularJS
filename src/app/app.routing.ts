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


const routes: Routes =[
  { path: 'Home', component: HomeComponent  },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'animal',  component: AnimalComponent ,canActivate: [AuthGuard] },
    { path: 'animal/deworm/:id',  component: DewormComponent ,canActivate: [AuthGuard] },
    { path: '',          redirectTo: 'Home', pathMatch: 'full' },
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
