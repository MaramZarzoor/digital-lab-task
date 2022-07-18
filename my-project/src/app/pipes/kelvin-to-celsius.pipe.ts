import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'kelvinToCelsius'
})
export class KelvinToCelsiusPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if(!value) return '';
    value = Number(value);
    return !isNaN(value) ? Math.round(value - 273.15).toString() : '';

  }

}
