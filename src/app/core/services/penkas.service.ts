import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Penka} from '../interfaces/penka';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PenkasService {


    penkasCollection: AngularFirestoreCollection<Penka>;
    penkas: Observable<Penka[]>;

    constructor(private afs: AngularFirestore) {
        this.penkasCollection = afs.collection<Penka>('penkas');
        this.penkas = this.penkasCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Penka;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    getPenkas(): any {
        return this.penkas;
    }

    getPenkaById(id): any {
        return this.penkasCollection.doc(id).valueChanges();
    }

    getPenkaByCodePenka(codePenka): any {
        return this.afs.collection<Penka>('penkas', ref => ref
            .where('codePenka', '==', codePenka)
            .where('status', 'in', ['1', '2', '9'])
            .orderBy('dateLimit', 'asc'))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Penka;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getAllPenkasByCodePenka(codePenka): any {
        return this.afs.collection<Penka>('penkas', ref => ref
            .where('codePenka', '==', codePenka)
            .where('status', 'in', ['1', '2', '9'])
            .orderBy('dateLimit', 'asc'))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Penka;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    addPenka(penka: Penka): any {
        this.penkasCollection.add(penka).catch(error => console.log(error));
    }

    updatePenka(id, nParticipants: number, accumulatedBet: number): any {
        this.penkasCollection.doc(id).update({nParticipants, accumulatedBet}).catch(error => console.log(error));
    }

    // tslint:disable-next-line:typedef
    updateStatus(id, status) {
        this.penkasCollection.doc(id).update({status}).catch(error => console.log(error));
    }

}
