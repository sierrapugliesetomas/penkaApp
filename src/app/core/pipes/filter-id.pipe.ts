import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterId'
})
export class FilterIdPipe implements PipeTransform {

    transform(items: Array<any>, id: string): any {
        return items.filter(item => item.id === id);
    }

}
