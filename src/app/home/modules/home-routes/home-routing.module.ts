// MODULES
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

// COMPONENTS
import {HomeComponent} from '../../components/home/home.component';

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
