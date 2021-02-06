// MODULES
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
// COMPONENTS
import {NewComponent} from '../components/new/new.component';
import {New2Component} from '../components/new2/new2.component';
import {New3Component} from '../components/new3/new3.component';
import {New4Component} from '../components/new4/new4.component';
import {PenkaDashboardComponent} from '../components/penka-dashboard/penka-dashboard.component';
import {ViewComponent} from '../components/view/view.component';
import {GridComponent} from '../components/grid/grid.component';
import {GambleComponent} from '../components/gamble/gamble.component';
import {JoinComponent} from '../components/join/join.component';
/*GUARDS*/
import {AuthGuard} from '../../core/guards/auth.guard';
import {PenkasComponent} from '../components/penkas/penkas.component';

const routes: Routes = [
    {path: 'penkas', component: PenkasComponent, canActivate: [AuthGuard]},
    {path: 'new', component: NewComponent, canActivate: [AuthGuard]},
    {path: 'new2/:type', component: New2Component, canActivate: [AuthGuard]},
    {path: 'new3/template/:codeTemplate', component: New3Component, canActivate: [AuthGuard]},
    {path: 'new3/singleMatches/:codePenka', component: New3Component, canActivate: [AuthGuard]},
    {path: 'new4/:codePenka', component: New4Component, canActivate: [AuthGuard]},
    {path: 'view/:codePenka', component: ViewComponent, canActivate: [AuthGuard]},
    {path: 'dashboard/:codePenka', component: PenkaDashboardComponent, canActivate: [AuthGuard]},

    {path: 'grid/:codePenka', component: GridComponent, canActivate: [AuthGuard]},
    {path: 'gamble/:codePenka', component: GambleComponent, canActivate: [AuthGuard]},
    {path: 'join', component: JoinComponent, canActivate: [AuthGuard]},
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
