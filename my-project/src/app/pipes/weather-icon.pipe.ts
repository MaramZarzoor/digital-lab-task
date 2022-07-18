import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherIcon'
})
export class WeatherIconPipe implements PipeTransform {
  iconMainLink = "http://openweathermap.org/img/wn/{iconCode}.png"
  transform(value: string, ...args: unknown[]): string {
    if(!value) return '';
    return this.iconMainLink.replace('{iconCode}', value);
  }

}
