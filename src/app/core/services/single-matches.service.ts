import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {SingleMatch} from '../interfaces/single-match';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SingleMatchesService {
    singleMatchesCollection: AngularFirestoreCollection<SingleMatch>;
    singleMatches: Observable<SingleMatch[]>;

    constructor(private afs: AngularFirestore) {
        this.singleMatchesCollection = afs.collection<SingleMatch>('singleMatches');
        this.singleMatches = this.singleMatchesCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as SingleMatch;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    getSingleMatches(): any { /* checked */
        return this.singleMatches;
    }

    getSingleMatchesPublicLimit(): any { /* checked */
        return this.afs.collection<SingleMatch>('singleMatches', ref => ref
            .where('publish', '==', true)
            .where('status', '==', '1')
            .orderBy('startDate', 'asc')
            .limit(10))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as SingleMatch;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getSingleMatchesPublic(): any { /* checked */
        return this.afs.collection<SingleMatch>('singleMatches', ref => ref
            .where('publish', '==', true)
            .where('status', '==', '1')
            .orderBy('startDate', 'asc'))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as SingleMatch;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getSingleMatchById(id): any { /* checked */
        return this.singleMatchesCollection.doc(id).valueChanges();
    }

    inactivated(id): any { /* checked */
        this.singleMatchesCollection.doc(id).update({status: '2'}).catch();
    }

}
