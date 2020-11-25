import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {ListMatches} from '../interfaces/list-matches';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ListMatchesService {

    listMatchesCollection: AngularFirestoreCollection<ListMatches>;
    listMatches: Observable<ListMatches[]>;

    constructor(private afs: AngularFirestore) {
        this.listMatchesCollection = afs.collection<ListMatches>('listMatches');
        this.listMatches = this.listMatchesCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as ListMatches;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    getMatches() {
        return this.listMatches;
    }

    // GET MATCHES BY CODE PENKA
    // tslint:disable-next-line:typedef
    getMBCP(codePenka) {
        return this.afs.collection<ListMatches>('listMatches', ref => ref.where('codePenka', '==', codePenka))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as ListMatches;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getMBCT(codeTemplate) {
        return this.afs.collection<ListMatches>('listMatches', ref => ref.where('codeTemplate', '==', codeTemplate)
            .where('status', '==', '1'))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as ListMatches;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getMatchForDelete(singleMatchId, userId, codePenka) {
        return this.afs.collection<ListMatches>('listMatches', ref => ref.where('singleMatchId', '==', singleMatchId)
            .where('userId', '==', userId).where('codePenka', '==', codePenka))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as ListMatches;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    // tslint:disable-next-line:typedef max-line-length
    addMatch(singleMatchId, codePenka, codeTemplate, userId, userName, userEmail, userPhoto, date, homeTeamId, homeTeamName, homeTeamAlias, homeTeamFlag, visitTeamId, visitTeamName, visitTeamAlias, visitTeamFlag, startDate, startTime, status) {
        this.listMatchesCollection.add({
            singleMatchId,
            codePenka,
            codeTemplate,
            userId,
            userName,
            userEmail,
            userPhoto,
            date,
            homeTeamId,
            homeTeamName,
            homeTeamAlias,
            homeTeamFlag,
            visitTeamId,
            visitTeamName,
            visitTeamAlias,
            visitTeamFlag,
            startDate,
            startTime,
            status
        }).catch(error => console.log(error));
    }

    // tslint:disable-next-line:typedef
    addMatchByCodePenka(listMatch: ListMatches) {
        this.listMatchesCollection.add(listMatch).catch(error => console.log(error));
    }

    // tslint:disable-next-line:typedef
    deleteMatch(id: string) {
        this.listMatchesCollection.doc(id).delete().catch(error => console.log(error));
    }

    // tslint:disable-next-line:typedef
    updateStatus(id: string, status: string) {
        this.listMatchesCollection.doc(id).update({status}).catch(error => console.log(error));
    }


}
