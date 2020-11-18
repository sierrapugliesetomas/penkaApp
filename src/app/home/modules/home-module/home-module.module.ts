// MODULES
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from '../home-routes/home-routing.module';
import {MaterialModule} from '../../../material/material.module';

// COMPONENTS
import {HomeComponent} from '../../components/home/home.component';
import {BannerComponent} from '../../components/banner/banner.component';
import {BarButtonDesktopComponent} from '../../components/bar-button-desktop/bar-button-desktop.component';
import {BarButtonMobileComponent} from '../../components/bar-button-mobile/bar-button-mobile.component';
import {HomePopComponent} from '../../components/home-pop/home-pop.component';
import {HomeTemplatesComponent} from '../../components/home-templates/home-templates.component';
import {HomeSingleMatchesComponent} from '../../components/home-single-matches/home-single-matches.component';
import {LoginComponent} from '../../components/login/login.component';
import {LayoutRoutingModule} from '../../../layout/modules/layout-routes/layout-routing.module';
import {CoreModule} from '../../../core/modules/core/core.module';
import {HomePenkaViewerComponent} from '../../components/home-penka-viewer/home-penka-viewer.component';
import {LayoutModuleModule} from '../../../layout/modules/layout-module/layout-module.module';


@NgModule({
    declarations: [
        HomeComponent,
        BannerComponent,
        BarButtonMobileComponent,
        BarButtonDesktopComponent,
        HomePopComponent,
        HomeTemplatesComponent,
        HomeSingleMatchesComponent,
        LoginComponent,
        HomePenkaViewerComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        LayoutRoutingModule,
        MaterialModule,
        CoreModule,
        LayoutModuleModule,
    ],
    exports: [
        HomeComponent,
        BannerComponent,
        BarButtonMobileComponent,
        BarButtonDesktopComponent,
        HomePopComponent,
        HomeTemplatesComponent,
        HomeSingleMatchesComponent,
        LoginComponent,
        HomePenkaViewerComponent
    ]
})
export class HomeModuleModule {
}
