import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CodePenkaService {
    codePenka = '';

    constructor() { }

    generateCodePenka(): string {
        this.codePenka = '';
        const characters = 'AbCdEfGhIjKvWxYz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < charactersLength; i++) {
            this.codePenka += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return this.codePenka;
    }
}
