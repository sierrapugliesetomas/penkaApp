// MODULES
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AppRoutingModule} from './app-routing.module';
import {LayoutModuleModule} from './layout/modules/layout-module/layout-module.module';
import {MaterialModule} from './material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/modules/core/core.module';
import {PenkaModuleModule} from './penka/modules/penka-module/penka-module.module';
import {HomeModuleModule} from './home/modules/home-module/home-module.module';
import {InboxModuleModule} from './inbox/modules/inbox-module/inbox-module.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

// COMPONENTS
import {AppComponent} from './app.component';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModuleModule,
        PenkaModuleModule,
        HomeModuleModule,
        InboxModuleModule,
        CoreModule,
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        FormsModule,

    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
