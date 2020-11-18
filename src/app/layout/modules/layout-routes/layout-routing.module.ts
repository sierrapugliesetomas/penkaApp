import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AboutusComponent} from '../../components/aboutus/aboutus.component';
import {FaqComponent} from '../../components/faq/faq.component';
import {MaterialModule} from '../../../material/material.module';

const routes: Routes = [
    {path: 'about', component: AboutusComponent},
    {path: 'faq', component: FaqComponent},
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule
    ],
    exports: [RouterModule]
})
export class LayoutRoutingModule {
}
