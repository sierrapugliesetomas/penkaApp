import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {SingleMatch} from '../interfaces/single-match';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SingleMatchesService {
    matches: Observable<SingleMatch[]>;
    matchesCollection: AngularFirestoreCollection<SingleMatch>;

    constructor(private readonly afs: AngularFirestore) {
        this.matchesCollection = afs.collection<SingleMatch>('singleMatches', ref => ref
            .orderBy('startDate', 'asc'));
    }

    getMatches(): void {
        this.matches = this.matchesCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as SingleMatch;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    getMatchesPublic(): any {
        return this.matches = this.afs.collection<SingleMatch>('singleMatches', ref => ref
            .where('publish', '==', true)
            .where('status', 'in', ['1','2'])
            .orderBy('startDate', 'asc'))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as SingleMatch;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getMatchesPublicLimit(): any {
        return this.matches = this.afs.collection<SingleMatch>('singleMatches', ref => ref
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

    getMatchById(id: string): any {
        return this.matchesCollection.doc(id).valueChanges();
    }

    changeMatchState(id: string, status: string): any {
        this.matchesCollection.doc(id).update({status}).then();
    }
}
