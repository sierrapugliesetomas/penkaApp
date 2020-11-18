import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PenkaRoutingModule} from '../penka-routes/penka-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/modules/core/core.module';
import {MaterialModule} from '../../../material/material.module';

// COMPONENTS
import {NewComponent} from '../../components/new/new.component';
import {ViewComponent} from '../../components/view/view.component';
import {TemplatesComponent} from '../../components/templates/templates.component';
import {SingleMatchesComponent} from '../../components/single-matches/single-matches.component';
import {GambleComponent} from '../../components/gamble/gamble.component';
import {ParticipantsComponent} from '../../components/participants/participants.component';
import {ListComponent} from '../../components/list/list.component';
import {JoinComponent} from '../../components/join/join.component';
import {PopComponent} from '../../components/pop/pop.component';
import {ViewTemplateComponent} from '../../components/templates/view-template/view-template.component';
import {New2Component} from '../../components/new2/new2.component';
import {New3Component} from '../../components/new3/new3.component';
import {New4Component} from '../../components/new4/new4.component';
import {RouterModule} from '@angular/router';
import {LayoutModuleModule} from '../../../layout/modules/layout-module/layout-module.module';
import {HomeModuleModule} from '../../../home/modules/home-module/home-module.module';
import {ViewMiniComponent} from '../../components/view-mini/view-mini.component';


@NgModule({
    declarations: [
        NewComponent,
        New2Component,
        New3Component,
        New4Component,
        ViewComponent,
        TemplatesComponent,
        SingleMatchesComponent,
        GambleComponent,
        ParticipantsComponent,
        ListComponent,
        JoinComponent,
        PopComponent,
        ViewTemplateComponent,
        ViewMiniComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        CoreModule,
        PenkaRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        CoreModule,
        FormsModule,
        LayoutModuleModule,
        HomeModuleModule,

    ],
    exports: [
        NewComponent,
        New2Component,
        New3Component,
        New4Component,
        ViewComponent,
        TemplatesComponent,
        SingleMatchesComponent,
        GambleComponent,
        ParticipantsComponent,
        ListComponent,
        PopComponent,
        ViewTemplateComponent,
        ViewMiniComponent,
    ]
})
export class PenkaModuleModule {
}
