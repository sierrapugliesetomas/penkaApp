import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUserId'
})
export class FilterUserIdPipe implements PipeTransform {

  transform(items: Array<any>, userId: string): any {
    return items.filter(item => item.userId === userId);
  }
}
