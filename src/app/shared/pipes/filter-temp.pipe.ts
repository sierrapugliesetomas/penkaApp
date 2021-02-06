import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterTemp'
})
export class FilterTempPipe implements PipeTransform {

    transform(items: Array<any>, temp: boolean): any {
        return items.filter(item => item.temp === temp);
    }


}
