import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Competition} from '../interfaces/competition';

@Injectable({
    providedIn: 'root'
})
export class CompetitionsService {

    competitionsCollection: AngularFirestoreCollection<Competition>;
    competitions: Observable<Competition[]>;

    constructor(private afs: AngularFirestore) {
        this.competitionsCollection = afs.collection<Competition>('competitions');
        this.competitions = this.competitionsCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Competition;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    // tslint:disable-next-line:typedef
    getCompetitions() {
        return this.competitions;
    }

    // tslint:disable-next-line:typedef
    getCompetitionById(id) {
        return this.competitionsCollection.doc(id).valueChanges();
    }

    getCompetitionsByName(name): any {
        return this.afs.collection<Competition>('competitions', ref => ref
            .where('name', '==', name))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Competition;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    // tslint:disable-next-line:typedef
    addCompetition(competition: Competition) {
        this.competitionsCollection.add(competition).catch(error => console.log(error));
    }

    // tslint:disable-next-line:typedef
    deleteCompetition(id) {
        this.competitionsCollection.doc(id).delete().then();
    }

    // tslint:disable-next-line:typedef
    updateCompetition(id, competition: Competition) {
        this.competitionsCollection.doc(id).update(competition).then();
    }
}
