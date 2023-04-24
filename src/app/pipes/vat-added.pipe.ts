import { CarDetail } from 'src/app/models/carDetail';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vatAdded'
})
export class VatAddedPipe implements PipeTransform {

  transform(value: number, vatPercent:number): number {

    return value + ((vatPercent/100) * value);
  }

}
