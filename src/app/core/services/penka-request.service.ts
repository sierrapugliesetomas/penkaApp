import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PenkaRequest} from '../interfaces/penkaRequest';

@Injectable({
    providedIn: 'root'
})
export class PenkaRequestService {

    penkaRequestCollection: AngularFirestoreCollection<PenkaRequest>;
    penkaRequest: Observable<PenkaRequest[]>;

    constructor(private afs: AngularFirestore) {
        this.penkaRequestCollection = afs.collection<PenkaRequest>('penkaRequest');
        this.penkaRequest = this.penkaRequestCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as PenkaRequest;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    getPenkaRequest() {
        return this.penkaRequest;
    }

    getPenkaRequestByMaker(makerId): any {
        return this.afs.collection<PenkaRequest>('penkaRequest', ref => ref
            .where('makerId', '==', makerId)
            .where('status', '==', '1')
            .orderBy('date', 'asc'))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as PenkaRequest;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getPenkaByUserAndCodePenka(userId, codePenka): any {
        return this.afs.collection<PenkaRequest>('penkaRequest', ref => ref
            .where('userId', '==', userId)
            .where('codePenka', '==', codePenka)
            .where('status', '==', '1')
            .orderBy('date', 'asc'))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as PenkaRequest;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getOtherNotificationsRequests(userId): any {
        return this.afs.collection<PenkaRequest>('penkaRequest', ref => ref            
            .where('userId', '==', userId)
            .where('status', 'in', ['8','9', '10', '11'])
            .orderBy('date', 'desc')
            .limit(15))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as PenkaRequest;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    addPenkaRequest(penkaRequest: PenkaRequest) {
        this.penkaRequestCollection.add(penkaRequest).catch(error => console.log(error));
    }

    agreePenkaRequest(id) {
        this.penkaRequestCollection.doc(id).update({status: '8'}).catch(error => console.log(error));
    }

    rejectPenkaRequest(id) {
        this.penkaRequestCollection.doc(id).update({status: '9'}).catch(error => console.log(error));
    }

    updatePenkaRequest(request: PenkaRequest) {
        this.penkaRequestCollection.doc(request.id).update(request).catch(error => console.log(error));
    }
}
