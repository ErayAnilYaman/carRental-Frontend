import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'filterBrandSearch'
})
export class FilterBrandSearchPipe implements PipeTransform {

  transform(value: Brand[],filterText : string): Brand[] {
    
    filterText = filterText ? filterText.toLocaleLowerCase():""

    return value ? value.filter((v:Brand)=>
    v.brandName.toLocaleLowerCase().indexOf(filterText) !== -1
    ):value

  }

}
