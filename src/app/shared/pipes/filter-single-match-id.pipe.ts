import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterSingleMatchId'
})
export class FilterSingleMatchIdPipe implements PipeTransform {
    transform(items: Array<any>, singleMatchId: string): any {
        return items.filter(item => item.singleMatchId === singleMatchId);
    }
}
