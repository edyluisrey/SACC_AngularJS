/*
GLORIA GALLEGO
MWA FINAL PROJECT
27-09-2017
*/


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent ]
})

export class NavbarModule {
/*     constructor(){    var currentUser = JSON.parse(localStorage.getItem('profile'));
    console.log("actual user", currentUser);}

 */
}
