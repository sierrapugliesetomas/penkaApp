// MODULES
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

// COMPONENTS
import {InboxComponent} from '../components/inbox/inbox.component';
import {AuthGuard} from '../../core/guards/auth.guard';

const routes: Routes = [
    {path: '', component: InboxComponent, canActivate: [AuthGuard]},
    {path: 'request/:id', component: InboxComponent, canActivate: [AuthGuard]},
    {path: 'friends', component: InboxComponent, canActivate: [AuthGuard]},
    {path: 'messages', component: InboxComponent, canActivate: [AuthGuard]},
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class InboxRoutingModule {
}
