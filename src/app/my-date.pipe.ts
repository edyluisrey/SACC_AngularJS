import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myDate'
})
export class MyDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value==null){
      return null;
    }
    var date = new Date(value);
    var currentDate = date.toISOString().slice(0,10);
    return currentDate;

  }

}
