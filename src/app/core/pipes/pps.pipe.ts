import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pps',
  standalone: true,
})
export class PpsPipe implements PipeTransform {
  transform(levels: any, ...args: unknown[]): number {
    let res = 0;
    res += levels.os * 5;
    res += levels.cpu * 50;
    res += levels.ram * 200;
    res += levels.ssd * 1000;
    res += levels.gpu * 5000;
    res += levels.ai * 10000;
    return res;
  }
}
