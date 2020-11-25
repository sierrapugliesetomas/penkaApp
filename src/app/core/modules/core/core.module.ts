import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterStatusPipe} from '../../pipes/filter-status.pipe';
import {FilterPublishPipe} from '../../pipes/filter-publish.pipe';
import {FilterCodePenkaPipe} from '../../pipes/filter-code-penka.pipe';
import {FilterCodeTemplatePipe} from '../../pipes/filter-code-template.pipe';
import {FilterUserIdPipe} from '../../pipes/filter-user-id.pipe';
import {FilterPenkaNamePipe} from '../../pipes/filter-penka-name.pipe';
import {FilterMakerIdPipe} from '../../pipes/filter-maker-id.pipe';
import {FilterSingleMatchIdPipe} from '../../pipes/filter-single-match-id.pipe';
import {FilterIdPipe} from '../../pipes/filter-id.pipe';
import {FilterTempPipe} from '../../pipes/filter-temp.pipe';
import {FilterNoMakerPipe} from '../../pipes/filter-no-maker.pipe';


@NgModule({
    declarations: [
        FilterStatusPipe,
        FilterPublishPipe,
        FilterCodePenkaPipe,
        FilterCodeTemplatePipe,
        FilterUserIdPipe,
        FilterPenkaNamePipe,
        FilterMakerIdPipe,
        FilterSingleMatchIdPipe,
        FilterIdPipe,
        FilterTempPipe,
        FilterNoMakerPipe,

    ],
    imports: [
        CommonModule,
    ],
    exports: [
        FilterStatusPipe,
        FilterPublishPipe,
        FilterCodePenkaPipe,
        FilterCodeTemplatePipe,
        FilterUserIdPipe,
        FilterPenkaNamePipe,
        FilterMakerIdPipe,
        FilterSingleMatchIdPipe,
        FilterIdPipe,
        FilterTempPipe,
        FilterNoMakerPipe,

    ]
})
export class CoreModule {
}
