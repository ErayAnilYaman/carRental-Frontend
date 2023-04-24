import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'filterCarSearch'
})
export class FilterCarSearchPipe implements PipeTransform {

  transform(value: CarDetail[],filterText: string): CarDetail[] {

    filterText = filterText?filterText.toLocaleLowerCase():""

    return value ? value.filter((v:CarDetail)=>
      v.description.toLocaleLowerCase().indexOf(filterText) !== -1
    ):value

  }

}
