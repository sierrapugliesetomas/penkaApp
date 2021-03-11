import {NgModule} from '@angular/core';
import {PenkaRoutingModule} from './penka-routing.module';
import {CoreModule} from '../../core/modules/core.module';
import {SharedModule} from '../../shared/modules/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {CommonModule} from '@angular/common';
// COMPONENTS
import {GambleComponent} from '../components/gamble/gamble.component';
import {GridComponent} from '../components/grid/grid.component';
import {JoinComponent} from '../components/join/join.component';
import {NewComponent} from '../components/new/new.component';
import {New2Component} from '../components/new2/new2.component';
import {New3Component} from '../components/new3/new3.component';
import {New4Component} from '../components/new4/new4.component';
import {ParticipantsComponent} from '../components/participants/participants.component';
import {PenkaDashboardComponent} from '../components/penka-dashboard/penka-dashboard.component';
import {PenkaMatchComponent} from '../components/penka-match/penka-match.component';
import {PenkaMatchGambleComponent} from '../components/penka-match-gamble/penka-match-gamble.component';
import {PenkaMatchGambleResultsComponent} from '../components/penka-match-gamble-results/penka-match-gamble-results.component';
import {ViewComponent} from '../components/view/view.component';
import {PenkasComponent} from '../components/penkas/penkas.component';
import {FriendsPenkasContainerComponent} from '../components/friends-penkas-container/friends-penkas-container.component';

@NgModule({
    declarations: [
        GambleComponent,
        GridComponent,
        JoinComponent,
        NewComponent,
        New2Component,
        New3Component,
        New4Component,
        ParticipantsComponent,
        PenkaDashboardComponent,
        PenkaMatchComponent,
        PenkaMatchGambleComponent,
        PenkaMatchGambleResultsComponent,
        ViewComponent,
        PenkasComponent,
        FriendsPenkasContainerComponent,

    ],
    imports: [
        CommonModule,
        CoreModule,
        PenkaRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        Ng2SearchPipeModule
    ],
    exports: [
        GambleComponent,
        GridComponent,
        JoinComponent,
        NewComponent,
        New2Component,
        New3Component,
        New4Component,
        ParticipantsComponent,
        PenkaDashboardComponent,
        PenkaMatchComponent,
        PenkaMatchGambleComponent,
        PenkaMatchGambleResultsComponent,
        ViewComponent,
        PenkasComponent,
        FriendsPenkasContainerComponent,
    ]
})
export class PenkaModule {
}
