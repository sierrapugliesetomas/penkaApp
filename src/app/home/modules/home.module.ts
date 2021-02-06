// MODULES
import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '../../shared/modules/shared.module';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import {FormsModule} from '@angular/forms';
// COMPONENTS
import {HomeComponent} from '../components/home/home.component';
import {ListMatchesDoneComponent} from '../components/list-matches-done/list-matches-done.component';
import {ListMatchesWaitComponent} from '../components/list-matches-wait/list-matches-wait.component';
import {ListParticipantsComponent} from '../components/list-participants/list-participants.component';
import {MainBannerComponent} from '../components/main-banner/main-banner.component';
import {PenkaDashboardMiniComponent} from '../components/penka-dashboard-mini/penka-dashboard-mini.component';
import {PenkaPickerComponent} from '../components/penka-picker/penka-picker.component';
import {PenkaPickerButtonComponent} from '../components/penka-picker-button/penka-picker-button.component';
import {PenkaViewerComponent} from '../components/penka-viewer/penka-viewer.component';
import {PopPenkasContainerComponent} from '../components/pop-penkas-container/pop-penkas-container.component';
import {SecondaryBannersComponent} from '../components/secondary-banners/secondary-banners.component';
import {SingleMatchesContainerComponent} from '../components/single-matches-container/single-matches-container.component';
import {TemplatesContainerComponent} from '../components/templates-container/templates-container.component';


@NgModule({
    declarations: [
        HomeComponent,
        ListMatchesDoneComponent,
        ListMatchesWaitComponent,
        ListParticipantsComponent,
        MainBannerComponent,
        PenkaDashboardMiniComponent,
        PenkaPickerComponent,
        PenkaPickerButtonComponent,
        PenkaViewerComponent,
        PopPenkasContainerComponent,
        SecondaryBannersComponent,
        SingleMatchesContainerComponent,
        TemplatesContainerComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HomeRoutingModule,
        MaterialModule,
        SharedModule,
    ],
    exports: [
        HomeComponent,
        ListMatchesDoneComponent,
        ListMatchesWaitComponent,
        ListParticipantsComponent,
        MainBannerComponent,
        PenkaDashboardMiniComponent,
        PenkaPickerComponent,
        PenkaPickerButtonComponent,
        PenkaViewerComponent,
        PopPenkasContainerComponent,
        SecondaryBannersComponent,
        SingleMatchesContainerComponent,
        TemplatesContainerComponent,
    ]
})
export class HomeModule {
}
