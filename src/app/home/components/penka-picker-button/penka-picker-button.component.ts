import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PenkasService} from '../../../core/services/penkas.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-penka-picker-button',
    templateUrl: './penka-picker-button.component.html',
    styleUrls: ['./penka-picker-button.component.scss']
})
export class PenkaPickerButtonComponent implements OnInit, OnDestroy {
    @Input() codePenka: string;
    penka = [];
    private unsubscribe$ = new Subject<void>();
    @Output() pickedPenka = new EventEmitter<string>();

    constructor(
        private penkasService: PenkasService) {
    }

    ngOnInit(): void {
        this.penkasService.getPenkaByCodePenka(this.codePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.penka = res;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    pick(codePenka): void {
        this.pickedPenka.emit(codePenka);
    }
}
