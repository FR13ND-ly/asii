import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ppc',
  standalone: true,
})
export class PpcPipe implements PipeTransform {
  transform(levels: any, ...args: unknown[]): number {
    let res = 1;
    res += levels.headset * 2;
    res += levels.monitor * 20;
    res += levels.keyboard * 200;
    res += levels.mouse * 2000;
    return res;
  }
}
