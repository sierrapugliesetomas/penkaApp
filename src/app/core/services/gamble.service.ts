import {Injectable} from '@angular/core';
import {Gamble} from '../interfaces/gamble';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GambleService {

    gambleCollection: AngularFirestoreCollection<Gamble>;
    gamble: Observable<Gamble[]>;

    constructor(private afs: AngularFirestore) {
        this.gambleCollection = afs.collection<Gamble>('gambles');
        this.gamble = this.gambleCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Gamble;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    getGamble() {
        return this.gamble;
    }

    getGambleByUpdate(userId, codePenka, matchId) {
        return this.afs.collection<Gamble>('gambles', ref => ref.where('userId', '==', userId)
            .where('codePenka', '==', codePenka).where('singleMatchId', '==', matchId))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Gamble;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    // get gamble by code penka
    getGBU(codePenka, userId) {
        return this.afs.collection<Gamble>('gambles', ref => ref.where('codePenka', '==', codePenka)
            .where('userId', '==', userId)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Gamble;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    addGamble(gamble: Gamble) {
        this.gambleCollection.add(gamble).catch(error => console.log(error));
    }

    updateGamble(id, homeTeamScore, visitTeamScore, winnerTeamId, draw) {
        this.gambleCollection.doc(id).update({
            homeTeamScore,
            visitTeamScore,
            winnerTeamId,
            draw,
            status: '2'
        }).catch(error => console.log(error));
    }
}
