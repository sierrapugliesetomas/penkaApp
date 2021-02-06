import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterNoCodePenka'
})
export class FilterNoCodePenkaPipe implements PipeTransform {

    transform(items: Array<any>, codePenka: string): any {
        return items.filter(item => item.codePenka !== codePenka);
    }
}
