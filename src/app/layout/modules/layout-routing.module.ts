/*MODULES*/
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
/* COMPONENTS*/
import {FaqComponent} from '../components/faq/faq.component';

const routes: Routes = [
    {path: 'faq', component: FaqComponent},
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class LayoutRoutingModule {
}
