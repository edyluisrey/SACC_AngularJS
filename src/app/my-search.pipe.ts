/*
GLORIA GALLEGO
MWA FINAL PROJECT
27-09-2017
*/


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mySearch'
})
export class MySearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value==null){
      return null;
    }
    if(args== null){
      return value;
    }
    let temp;

Object.keys(args).forEach(function(key) {
  if(args[key]._id==value){
    temp= args[key].pr_title + " " +args[key].pr_lastname + " " +args[key].pr_firstname;
 }
  });
    
    return temp;
  }

}
