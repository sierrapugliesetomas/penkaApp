import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterPenkaName'
})
export class FilterPenkaNamePipe implements PipeTransform {

    transform(items: Array<any>, penkaName: string): any {
        return items.filter(item => item.name === penkaName || item.makerName === penkaName);
    }
}
