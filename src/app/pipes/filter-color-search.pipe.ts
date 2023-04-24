import { Color } from './../models/color';
import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';

@Pipe({
  name: 'filterColorSearch'
})
export class FilterColorSearchPipe implements PipeTransform {

  transform(value: Color[], filterText: string): Color[] {
    filterText = filterText ? filterText.toLocaleLowerCase():""

    return value ?value.filter((c:Color)=>
      c.colorName.toLocaleLowerCase().indexOf(filterText) !== -1
    ):value

  }

}
