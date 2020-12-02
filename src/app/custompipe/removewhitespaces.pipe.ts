import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removewhitespaces'
})
export class RemovewhitespacesPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
  	value = value.replace('&','');
  	value = value.replace('  ','-');
  	value = value.toLowerCase();
    return value.replace(/ /g, '-');
  }

}
