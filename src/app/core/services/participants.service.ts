import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Participant} from '../interfaces/participant';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ParticipantsService {

    participantsCollection: AngularFirestoreCollection<Participant>;
    participants: Observable<Participant[]>;

    constructor(private afs: AngularFirestore) {
        this.participantsCollection = afs.collection<Participant>('participants');
        this.participants = this.participantsCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Participant;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    getParticipants(): any {
        return this.participants;
    }

    getParticipantsPublic(): any {
        return this.afs.collection<Participant>('participants', ref => ref
            .where('status', '==', '1')
            .orderBy('accumulatedScore', 'desc'))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Participant;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getParticipantByCodePenka(codePenka): any { /* participant.ts */
        return this.afs.collection<Participant>('participants', ref => ref
            .where('codePenka', '==', codePenka)
            .where('status', 'in', ['1', '2', '9'])
            .orderBy('accumulatedScore', 'desc'))
            .snapshotChanges()
            .pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Participant;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getParticipantByCodePenkaLimit4(codePenka): any { /* participant.ts */
        return this.afs.collection<Participant>('participants', ref => ref
            .where('codePenka', '==', codePenka)
            .where('status', 'in', ['1', '2', '9'])
            .orderBy('accumulatedScore', 'desc')
            .limit(4))
            .snapshotChanges()
            .pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Participant;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getParticipantByUserId(userId): any {
        return this.afs.collection<Participant>('participants', ref => ref
            .where('userId', '==', userId)
            .where('status', '==', '1')
            .orderBy('date', 'asc'))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Participant;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getAllParticipantByUserId(userId): any {
        return this.afs.collection<Participant>('participants', ref => ref
            .where('userId', '==', userId)
            .where('status', 'in', ['1', '2', '9'])
            .orderBy('date', 'desc'))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Participant;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getOpenParticipantByUserId(userId): any {
        return this.afs.collection<Participant>('participants', ref => ref
            .where('userId', '==', userId)
            .where('status', 'in', ['1'])
            .orderBy('date', 'asc'))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Participant;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getParticipantByUserAndCodePenka(userId, codePenka): any {
        return this.afs.collection<Participant>('participants', ref => ref
            .where('userId', '==', userId)
            .where('codePenka', '==', codePenka)
            .where('status', '==', '1'))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Participant;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getParticipantByUserAndCodePenkaAllStatus(userId, codePenka): any {
        return this.afs.collection<Participant>('participants', ref => ref
            .where('userId', '==', userId)
            .where('codePenka', '==', codePenka))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Participant;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    addParticipant(participant: Participant): void {
        this.participantsCollection.add(participant)
            .catch(error => console.log(error));
    }

    updateAccumulatedScore(id, accumulatedScore): void {
        this.participantsCollection.doc(id).update({accumulatedScore}).then();
    }

    updatePlace(id, place): void {
        this.participantsCollection.doc(id).update({place}).catch();
    }

    updateParticipation(id, status): any {
        this.participantsCollection.doc(id).update({status}).catch();
    }
}
