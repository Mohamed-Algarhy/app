import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serchFollwoers',
})
export class SerchFollwoersPipe implements PipeTransform {
  transform(folowers: Friend[], serchWord: string): Friend[] {
    return folowers.filter((item) =>
      item.name.toLocaleLowerCase().includes(serchWord.toLowerCase()),
    );
  }
}
