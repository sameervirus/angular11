import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCases'
})
export class TitleCasePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
  	value = value.toUpperCase();
    return value.replace(/-/g, ' ');
  }

}
