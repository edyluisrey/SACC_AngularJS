import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { AnimalComponent } from './animal/animal.component';


const routes: Routes =[
    { path: 'user',           component: UserComponent },
    { path: 'animal',          component: AnimalComponent },
  { path: '',          redirectTo: 'animal', pathMatch: 'full' }
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
