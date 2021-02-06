// MODULES
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
// COMPONENTS
import {HomeComponent} from '../components/home/home.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]

})
export class HomeRoutingModule {
}
