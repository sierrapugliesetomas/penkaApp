// MODULES
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material/material.module';
import {CoreModule} from '../../../core/modules/core/core.module';
import {FormsModule} from '@angular/forms';
import {LayoutRoutingModule} from '../layout-routes/layout-routing.module';
// COMPONENTS
import {HeaderComponent} from '../../components/header/header.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {FaqComponent} from '../../components/faq/faq.component';
import {AboutusComponent} from '../../components/aboutus/aboutus.component';
import {NotFoundComponent} from '../../components/not-found/not-found.component';
import {PageHeaderComponent} from '../../components/page-header/page-header.component';
import {BackSpaceComponent} from '../../components/back-space/back-space.component';
import {MatchGambleComponent} from '../../components/match-gamble/match-gamble.component';
import {MatchComponent} from '../../components/match/match.component';
import {MatchResultComponent} from '../../components/match-result/match-result.component';
import {MatchMiniComponent} from '../../components/match-mini/match-mini.component';
import {PenkaInformationCardComponent} from '../../components/penka-information-card/penka-information-card.component';
import {MatchMiniGambleComponent} from '../../components/match-mini-gamble/match-mini-gamble.component';
import {MatchSinglematchComponent} from '../../components/match-singlematch/match-singlematch.component';
import {MatchSinglematchMiniComponent} from '../../components/match-singlematch-mini/match-singlematch-mini.component';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        FaqComponent,
        AboutusComponent,
        NotFoundComponent,
        PageHeaderComponent,
        BackSpaceComponent,
        MatchGambleComponent,
        MatchComponent,
        MatchResultComponent,
        MatchMiniComponent,
        MatchMiniGambleComponent,
        PenkaInformationCardComponent,
        MatchSinglematchComponent,
        MatchSinglematchMiniComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        LayoutRoutingModule,
        CoreModule,
        FormsModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        FaqComponent,
        AboutusComponent,
        NotFoundComponent,
        PageHeaderComponent,
        BackSpaceComponent,
        MatchGambleComponent,
        MatchComponent,
        MatchResultComponent,
        MatchMiniComponent,
        MatchMiniGambleComponent,
        PenkaInformationCardComponent,
        MatchSinglematchComponent,
        MatchSinglematchMiniComponent
    ]
})
export class LayoutModuleModule {
}
