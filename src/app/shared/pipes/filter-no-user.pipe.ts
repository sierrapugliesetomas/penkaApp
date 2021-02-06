import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterNoUser'
})
export class FilterNoUserPipe implements PipeTransform {

    transform(items: Array<any>, userId: string): any {
        return items.filter(item => item.userId !== userId);
    }

}
