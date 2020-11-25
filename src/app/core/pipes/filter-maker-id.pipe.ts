import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterMakerId'
})
export class FilterMakerIdPipe implements PipeTransform {

    transform(items: Array<any>, makerId: string): any {
        return items.filter(item => item.makerId === makerId);
    }

}
