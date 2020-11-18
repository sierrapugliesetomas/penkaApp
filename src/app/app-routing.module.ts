import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './layout/components/not-found/not-found.component';
import {LoginComponent} from './home/components/login/login.component';

const routes: Routes = [
    // LOGIN
    {
        path: 'login', component: LoginComponent
    },
    // HOME
    {
        path: 'home',
        loadChildren: () => import('./home/modules/home-module/home-module.module').then(m => m.HomeModuleModule)
    },
    // INBOX
    {
        path: 'inbox',
        loadChildren: () => import('./inbox/modules/inbox-module/inbox-module.module').then(m => m.InboxModuleModule)
    },
    // PENKA
    {
        path: 'penka',
        loadChildren: () => import('./penka/modules/penka-module/penka-module.module').then(m => m.PenkaModuleModule)
    },
    // LAYOUT
    {
        path: 'layout',
        loadChildren: () => import('./layout/modules/layout-module/layout-module.module').then(m => m.LayoutModuleModule)
    },
    // NOT FOUND
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent}


];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
