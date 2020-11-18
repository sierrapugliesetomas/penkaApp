import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabLink, MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatTabsModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatBadgeModule,
        MatListModule,
        MatCardModule,
        MatGridListModule,
        MatSidenavModule,
        MatDividerModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        ClipboardModule,
        MatDialogModule,
        MatStepperModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatSnackBarModule,
        MatMenuModule,
        MatRadioModule,
        MatTableModule

    ],
    exports: [
        MatTabsModule,
        MatTabLink,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatBadgeModule,
        MatListModule,
        MatCardModule,
        MatGridListModule,
        MatSidenavModule,
        MatDividerModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        ClipboardModule,
        MatDialogModule,
        MatStepperModule,
        CdkStepperModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatSnackBarModule,
        MatMenuModule,
        MatRadioModule,
        MatTableModule

    ]
})
export class MaterialModule {
}
