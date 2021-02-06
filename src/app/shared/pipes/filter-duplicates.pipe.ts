import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'filterDuplicates'
})
export class FilterDuplicatesPipe implements PipeTransform {

    transform(value: any): any {
        if (value !== undefined && value !== null) {
            return _.uniqBy(value, 'codePenka');
        }
        return value;
    }
}
