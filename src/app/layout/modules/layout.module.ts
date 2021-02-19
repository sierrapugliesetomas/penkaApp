// MODULES
import {NgModule} from '@angular/core';
import {LayoutRoutingModule} from './layout-routing.module';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import {SharedModule} from '../../shared/modules/shared.module';
// COMPONENTS
import {BrandLogoContainerComponent} from '../components/brand-logo-container/brand-logo-container.component';
import {ButtonNotificationComponent} from '../components/button-notification/button-notification.component';
import {FaqComponent} from '../components/faq/faq.component';
import {FooterComponent} from '../components/footer/footer.component';
import {HeaderComponent} from '../components/header/header.component';
import {MenuContainerComponent} from '../components/menu-container/menu-container.component';
import {NotificationContainerComponent} from '../components/notification-container/notification-container.component';
import {SessionContainerComponent} from '../components/session-container/session-container.component';
import {LoginComponent} from '../components/login/login.component';
import {RulesComponent} from '../components/rules/rules.component';

@NgModule({
    declarations: [
        BrandLogoContainerComponent,
        ButtonNotificationComponent,
        FaqComponent,
        FooterComponent,
        HeaderComponent,
        MenuContainerComponent,
        NotificationContainerComponent,
        SessionContainerComponent,
        LoginComponent,
        RulesComponent
    ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MaterialModule,
        SharedModule,
    ],
    exports: [
        BrandLogoContainerComponent,
        ButtonNotificationComponent,
        FaqComponent,
        FooterComponent,
        HeaderComponent,
        MenuContainerComponent,
        NotificationContainerComponent,
        SessionContainerComponent,
        LoginComponent,
        RulesComponent
    ]
})
export class LayoutModule {
}
