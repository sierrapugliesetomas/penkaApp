import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './layout/components/login/login.component';

const routes: Routes = [
    // LOGIN
    {
        path: 'login', component: LoginComponent
    },
    // HOME
    {
        path: 'home',
        loadChildren: () => import('./home/modules/home.module').then(m => m.HomeModule)
    },
    // INBOX
    // {
    //     path: 'inbox',
    //     loadChildren: () => import('./inbox/modules/inbox.module').then(m => m.InboxModule)
    // },
    // PENKA
    {
        path: 'penka',
        loadChildren: () => import('./penka/modules/penka.module').then(m => m.PenkaModule)
    },
    // LAYOUT
    {
        path: 'layout',
        loadChildren: () => import('./layout/modules/layout.module').then(m => m.LayoutModule)
    },
    // NOT FOUND
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    /*{path: '**', component: NotFoundComponent}*/


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
