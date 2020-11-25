// MODULES
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

// COMPONENTS
import {ListComponent} from '../../components/list/list.component';
import {NewComponent} from '../../components/new/new.component';
import {ViewComponent} from '../../components/view/view.component';
import {TemplatesComponent} from '../../components/templates/templates.component';
import {SingleMatchesComponent} from '../../components/single-matches/single-matches.component';
import {ParticipantsComponent} from '../../components/participants/participants.component';
import {GambleComponent} from '../../components/gamble/gamble.component';
import {JoinComponent} from '../../components/join/join.component';
import {PopComponent} from '../../components/pop/pop.component';
import {AuthGuard} from '../../../core/guards/auth.guard';
import {ViewTemplateComponent} from '../../components/templates/view-template/view-template.component';
import {New4Component} from '../../components/new4/new4.component';
import {New3Component} from '../../components/new3/new3.component';
import {New2Component} from '../../components/new2/new2.component';

const routes: Routes = [
    {path: 'list', component: ListComponent, canActivate: [AuthGuard]},
    {path: 'new', component: NewComponent, canActivate: [AuthGuard]},
    {path: 'new2/:type', component: New2Component, canActivate: [AuthGuard]},
    {path: 'new3/template/:codeTemplate', component: New3Component, canActivate: [AuthGuard]},
    {path: 'new3/singleMatches/:codePenka', component: New3Component, canActivate: [AuthGuard]},
    {path: 'new4/:codePenka', component: New4Component, canActivate: [AuthGuard]},
    {path: 'view/:id', component: ViewComponent, canActivate: [AuthGuard]},

    // TEMPLATES
    {path: 'templates', component: TemplatesComponent, canActivate: [AuthGuard]},
    {path: 'templates/view/:templateId', component: ViewTemplateComponent},

    {path: 'singleMatches', component: SingleMatchesComponent, canActivate: [AuthGuard]},
    {path: 'participants/:codePenka', component: ParticipantsComponent, canActivate: [AuthGuard]},
    {path: 'gamble/:id', component: GambleComponent, canActivate: [AuthGuard]},
    {path: 'join', component: JoinComponent, canActivate: [AuthGuard]},
    {path: 'pop', component: PopComponent, canActivate: [AuthGuard]}
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class PenkaRoutingModule {
}
