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
        this.participantsCollection = afs.collection<Participant>('participants', ref => ref.orderBy('accumulatedScore', 'desc'));
        this.participants = this.participantsCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Participant;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    getParticipants() {
        return this.participants;
    }

    /* Get participants on status 1 */
    getParticipantsPublic(): any {
        return this.afs.collection<Participant>('participants', ref => ref.where('status', '==', '1'))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Participant;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getParticipantByUserAndCodePenka(userId, codePenka) {
        return this.afs.collection<Participant>('participants', ref => ref.where('userId', '==', userId)
            .where('codePenka', '==', codePenka)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Participant;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    getParticipantByUser(userId) {
        return this.afs.collection<Participant>('participants', ref => ref.where('userId', '==', userId))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Participant;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getParticipantPop(userId) {
        return this.afs.collection<Participant>('participants', ref => ref.where('status', '==', '1')
            .where('userId', '==', userId)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Participant;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    addParticipant(participant: Participant) {
        this.participantsCollection.add(participant)
            .catch(error => console.log(error));
    }

    updateParticipants(id, participant: Participant) {
        this.participantsCollection.doc(id).update(participant)
            .catch(error => console.log(error));
    }
}
