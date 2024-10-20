import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): string {
    if (value > 999999999) return (value / 1000000000).toFixed(1) + 'B';
    if (value > 999999) return (value / 1000000).toFixed(1) + 'M';
    if (value > 999) return (value / 1000).toFixed(1) + 'K';
    return value.toString();
  }
}
