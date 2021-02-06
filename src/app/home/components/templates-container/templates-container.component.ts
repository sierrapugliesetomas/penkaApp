import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {TemplatesService} from '../../../core/services/templates.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-templates-container',
    templateUrl: './templates-container.component.html',
    styleUrls: ['./templates-container.component.scss']
})
export class TemplatesContainerComponent implements OnInit, OnDestroy {
    templates = [];
    private unsubscribe$ = new Subject<void>();
    today = new Date();

    constructor(
        private templateService: TemplatesService) {
    }

    ngOnInit(): void {
        this.templateService.getTemplatesPublicLimit()
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.templates = res;
                this.templates.forEach(item => {
                    if (this.today >= item.limitDate.toDate()) {
                        this.templateService.inactivated(item.id);
                    }
                });

            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
