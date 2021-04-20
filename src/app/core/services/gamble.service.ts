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

    getGamble(): any {
        return this.gamble;
    }

    getGambleByCodePenka(codePenka): any {
        return this.afs.collection<Gamble>('gambles', ref => ref
            .where('codePenka', '==', codePenka)
            .orderBy('startDate', 'asc'))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Gamble;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getGambleByUserId(userId): any {
        return this.afs.collection<Gamble>('gambles', ref => ref
            .where('userId', '==', userId))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Gamble;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getGambleByCodePenkaAndUserId(userId, codePenka): any {
        return this.afs.collection<Gamble>('gambles', ref => ref
            .where('userId', '==', userId)
            .where('codePenka', '==', codePenka)
            .orderBy('status', 'asc')
            .orderBy('startDate', 'asc'))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Gamble;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getGamblesWait(userId, codePenka): any {
        return this.afs.collection<Gamble>('gambles', ref => ref
            .where('userId', '==', userId)
            .where('codePenka', '==', codePenka)
            .where('status', '==', '1')
            .orderBy('startDate', 'asc'))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Gamble;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getGamblesDone(codePenka): any {
        return this.afs.collection<Gamble>('gambles', ref => ref
            .where('codePenka', '==', codePenka)
            .where('status', '==', '2')
            .orderBy('startDate', 'asc'))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Gamble;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getGambleByGetScore(userId, codePenka): any {
        return this.afs.collection<Gamble>('gambles', ref => ref
            .where('userId', '==', userId)
            .where('codePenka', '==', codePenka)
            .where('status', '==', '2'))
            .snapshotChanges()
            .pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Gamble;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
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

    // get gamble by code penka and UserId
    // tslint:disable-next-line:typedef
    getMatch(codePenka, userId, singleMatchId) {
        return this.afs.collection<Gamble>('gambles', ref => ref.where('codePenka', '==', codePenka)
            .where('userId', '==', userId).where('singleMatchId', '==', singleMatchId))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Gamble;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    // get gamble by score accumulated
    // tslint:disable-next-line:typedef


    // tslint:disable-next-line:typedef
    getMatchReadyToPlay() {/* get gambles ready to play status 1 */
        return this.afs.collection<Gamble>('gambles').snapshotChanges()
            .pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Gamble;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    // tslint:disable-next-line:typedef
    addGamble(gamble: Gamble) {
        this.gambleCollection.add(gamble).catch(error => console.log(error));
    }

    editGambleHomeScore(id, homeTeamScore): void {
        this.gambleCollection.doc(id).update({homeTeamScore, saved: false});
    }

    editGambleVisitScore(id, visitTeamScore): void {
        this.gambleCollection.doc(id).update({visitTeamScore, saved: false});
    }
	
	editGambleScores(id, homeTeamScore, visitTeamScore): void {
		this.gambleCollection.doc(id).update({ homeTeamScore, visitTeamScore, saved: false })
    }

    enableGamble(id): void {
        this.gambleCollection.doc(id).update({saved: false});
    }

    updateGamble(id, winnerTeamId, draw): any {
        this.gambleCollection.doc(id).update({
            winnerTeamId,
            draw,
            saved: true
        }).catch(error => console.log(error));
    }

    updateGambleMedium(id, winnerTeamId, draw): any {
        this.gambleCollection.doc(id).update({winnerTeamId, draw, saved: true});
    }


}
