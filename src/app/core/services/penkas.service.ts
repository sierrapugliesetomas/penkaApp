import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Penka} from '../interfaces/penka';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PenkasService {
    penkasCollection: AngularFirestoreCollection<Penka>;
    penkas: Observable<Penka[]>;

    constructor(private readonly afs: AngularFirestore) {
        this.penkasCollection = afs.collection<Penka>('penkas');
        this.penkas = this.penkasCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Penka;
                const id = a.payload.doc.id;
                return {id, ...data};
            })));
    }

    onSavePenka(penka: Penka, penkaId: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const id = penkaId || this.afs.createId();
                const data = {id, ...penka};
                const result = await this.penkasCollection.doc(id).set(data);
                resolve(result);
            } catch (err) {
                reject(err.message);
            }
        });
    }

    onDeletePenka(penkaId: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.penkasCollection.doc(penkaId).delete();
                resolve(result);
            } catch (err) {
                reject(err.message);
            }
        });
    }

    getPenkas(): any {
        return this.penkas;
    }

    getPenkaById(penkaId: string): any {
        return this.penkasCollection.doc(penkaId).valueChanges();
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
