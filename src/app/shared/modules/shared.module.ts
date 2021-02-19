/* MODULES */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material/material.module';
/* COMPONENTS */
import {MatchMiniComponent} from '../components/match-mini/match-mini.component';
import {MatchMiniGambleComponent} from '../components/match-mini-gamble/match-mini-gamble.component';
import {PageHeaderComponent} from '../components/page-header/page-header.component';
import {PageHeaderStepsComponent} from '../components/page-header-steps/page-header-steps.component';
import {PenkaComponent} from '../components/penka/penka.component';
import {SingleMatchComponent} from '../components/single-match/single-match.component';
import {SingleMatchPickedComponent} from '../components/single-match-picked/single-match-picked.component';
import {TemplateComponent} from '../components/template/template.component';
/* PIPES */
import {FilterStatusPipe} from '../pipes/filter-status.pipe';
import {FilterPublishPipe} from '../pipes/filter-publish.pipe';
import {FilterCodePenkaPipe} from '../pipes/filter-code-penka.pipe';
import {FilterNoCodePenkaPipe} from '../pipes/filter-no-code-penka.pipe';
import {FilterCodeTemplatePipe} from '../pipes/filter-code-template.pipe';
import {FilterUserIdPipe} from '../pipes/filter-user-id.pipe';
import {FilterNoUserPipe} from '../pipes/filter-no-user.pipe';
import {FilterPenkaNamePipe} from '../pipes/filter-penka-name.pipe';
import {FilterMakerIdPipe} from '../pipes/filter-maker-id.pipe';
import {FilterNoMakerPipe} from '../pipes/filter-no-maker.pipe';
import {FilterSingleMatchIdPipe} from '../pipes/filter-single-match-id.pipe';
import {FilterIdPipe} from '../pipes/filter-id.pipe';
import {FilterTempPipe} from '../pipes/filter-temp.pipe';
import {FilterTeamNamePipe} from '../pipes/filter-team-name.pipe';
import {FilterDuplicatesPipe} from '../pipes/filter-duplicates.pipe';
import {ConvertToDatePipe} from '../pipes/convert-to-date.pipe';
import {PenkaPopComponent} from '../components/penka-pop/penka-pop.component';
import {MatchMiniContainerComponent} from '../components/match-mini-container/match-mini-container.component';
import {MatchMiniCounterComponent} from '../components/match-mini-counter/match-mini-counter.component';
import {ButtonContinueComponent} from '../components/button-continue/button-continue.component';
import {ButtonBackComponent} from '../components/button-back/button-back.component';

@NgModule({
    declarations: [
        MatchMiniComponent,
        MatchMiniContainerComponent,
        MatchMiniCounterComponent,
        MatchMiniGambleComponent,
        PageHeaderComponent,
        PageHeaderStepsComponent,
        PenkaComponent,
        PenkaPopComponent,
        SingleMatchComponent,
        SingleMatchPickedComponent,
        TemplateComponent,
        FilterStatusPipe,
        FilterPublishPipe,
        FilterCodePenkaPipe,
        FilterNoCodePenkaPipe,
        FilterCodeTemplatePipe,
        FilterUserIdPipe,
        FilterNoUserPipe,
        FilterPenkaNamePipe,
        FilterMakerIdPipe,
        FilterNoMakerPipe,
        FilterSingleMatchIdPipe,
        FilterIdPipe,
        FilterTempPipe,
        FilterTeamNamePipe,
        FilterDuplicatesPipe,
        ConvertToDatePipe,
        ButtonContinueComponent,
        ButtonBackComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
    ],
    exports: [
        MatchMiniComponent,
        MatchMiniContainerComponent,
        MatchMiniCounterComponent,
        MatchMiniGambleComponent,
        PageHeaderComponent,
        PageHeaderStepsComponent,
        PenkaComponent,
        PenkaPopComponent,
        SingleMatchComponent,
        SingleMatchPickedComponent,
        TemplateComponent,
        FilterStatusPipe,
        FilterPublishPipe,
        FilterCodePenkaPipe,
        FilterNoCodePenkaPipe,
        FilterCodeTemplatePipe,
        FilterUserIdPipe,
        FilterNoUserPipe,
        FilterPenkaNamePipe,
        FilterMakerIdPipe,
        FilterNoMakerPipe,
        FilterSingleMatchIdPipe,
        FilterIdPipe,
        FilterTempPipe,
        FilterTeamNamePipe,
        FilterDuplicatesPipe,
        ConvertToDatePipe,
        ButtonContinueComponent,
        ButtonBackComponent,
    ]
})
export class SharedModule {
}
