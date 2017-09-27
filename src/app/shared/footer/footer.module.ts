/*
GLORIA GALLEGO
MWA FINAL PROJECT
27-09-2017
*/


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ FooterComponent ],
    exports: [ FooterComponent ]
})

export class FooterModule {}
