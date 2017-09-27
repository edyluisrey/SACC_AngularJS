import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { AnimalComponent } from './animal/animal.component';

import { AuthGuard } from './auth/auth-guard.service';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes =[
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'animal',  component: AnimalComponent },
    { path: '',          redirectTo: 'animal', pathMatch: 'full' },
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
