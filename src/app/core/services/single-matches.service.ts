import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SingleMatch} from '../interfaces/single-match';

@Injectable({
    providedIn: 'root'
})
export class SingleMatchesService {

    singleMatchesCollection: AngularFirestoreCollection<SingleMatch>;
    singleMatches: Observable<SingleMatch[]>;

    constructor(private afs: AngularFirestore) {
        this.singleMatchesCollection = afs.collection<SingleMatch>('singleMatches', ref => ref.orderBy('startTime', 'asc'));
        this.singleMatches = this.singleMatchesCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as SingleMatch;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    getSingleMatches() {
        return this.singleMatches;
    }

    /* get matches on status 0 and publish true */
    getSingleMatchesPublic(): any {
        return this.afs.collection<SingleMatch>('singleMatches', ref => ref.where('status', '==', '0')
            .where('publish', '==', true).limit(10)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as SingleMatch;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }


    getSingleMatchById(id) {
        return this.afs.collection('singleMatches').doc(id).valueChanges();
    }
}
