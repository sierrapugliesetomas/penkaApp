import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterTeamName'
})
export class FilterTeamNamePipe implements PipeTransform {

    transform(items: Array<any>, teamName: string): any {
        const data = teamName.toLowerCase();
        return items.filter(item =>
            item.homeTeamName.toLowerCase() === data ||
            item.homeTeamAlias.toLowerCase() === data ||
            item.visitTeamName.toLowerCase() === data ||
            item.visitTeamAlias.toLowerCase() === data ||

            item.homeTeamName.toLowerCase().includes(data) ||
            item.homeTeamAlias.toLowerCase().includes(data) ||
            item.visitTeamName.toLowerCase().includes(data) ||
            item.visitTeamAlias.toLowerCase().includes(data) ||
            item.competition.toLowerCase().includes(data));
    }

}
