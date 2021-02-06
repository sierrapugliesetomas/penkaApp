import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterPenkaName'
})
export class FilterPenkaNamePipe implements PipeTransform {

    transform(items: Array<any>, penkaName: string): any {
        const data = penkaName.toLowerCase();
        return items.filter(item => item.name.toLowerCase().includes(data) || item.makerName.toLowerCase().includes(data));
    }
}
