import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Template} from '../../../core/interfaces/template';
import {TemplatesService} from '../../../core/services/templates.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
    pageHeader: 'Organiza una Penka';

    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    isLinear = false;


    // get information
    templates$: Observable<Template[]>;

    // form elements
    name = new FormControl('', [Validators.required]);

    constructor(
        private _formBuilder: FormBuilder,
        private templatesService: TemplatesService) {
    }

    ngOnInit(): void {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
        this.thirdFormGroup = this._formBuilder.group({
            thirdCtrl: ['', Validators.required]
        });

        this.templates$ = this.templatesService.getTemplates();
    }

    getErrorMessage() {
        if (this.name.hasError('required')) {
            return 'Debes Ingresar el nombre para la Penka';
        }
    }


}
