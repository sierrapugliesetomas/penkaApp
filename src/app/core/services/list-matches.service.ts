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
        this.listMatchesCollection = afs.collection<ListMatches>('listMatches', ref => ref
            .where('status', '==', '1')
            .orderBy('startDate', 'asc'));
        this.listMatches = this.listMatchesCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as ListMatches;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    getListMatches(): any {
        return this.listMatches;
    }

    getListMatchesTempByCodePenka(codePenka): any { /* checked */
        return this.afs.collection<ListMatches>('listMatches', ref => ref
            .where('codePenka', '==', codePenka)
            .where('status', '==', '0')
            .orderBy('startDate', 'asc'))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as ListMatches;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getListMatchesByCodePenka(codePenka): any { /* Checked */
        return this.afs.collection<ListMatches>('listMatches', ref => ref
            .where('codePenka', '==', codePenka)
            .where('status', '==', '1')
            .orderBy('startDate', 'asc'))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as ListMatches;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getListMatchesByCodePenkaLimit4(codePenka): any { /* Checked */
        return this.afs.collection<ListMatches>('listMatches', ref => ref
            .where('codePenka', '==', codePenka)
            .where('status', '==', '1')
            .orderBy('startDate', 'asc')
            .limit(4))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as ListMatches;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getListMatchesByCodeTemplate(codeTemplate): any {
        return this.afs.collection<ListMatches>('listMatches', ref => ref
            .where('codeTemplate', '==', codeTemplate)
            .where('status', '==', '1')
            .orderBy('startDate', 'asc'))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as ListMatches;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getListMatchesByCodeTemplateLimit4(codeTemplate): any {
        return this.afs.collection<ListMatches>('listMatches', ref => ref
            .where('codeTemplate', '==', codeTemplate)
            .where('status', '==', '1')
            .orderBy('startDate', 'asc')
            .limit(4))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as ListMatches;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getMatchesPublic(): any {
        return this.afs.collection<ListMatches>('listMatches', ref => ref
            .where('status', '==', '1')
            .orderBy('startDate', 'asc'))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as ListMatches;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    verifiedIfExist(userId, singleMatchId, codePenka): any {
        return this.afs.collection<ListMatches>('listMatches', ref => ref
            .where('singleMatchId', '==', singleMatchId)
            .where('codePenka', '==', codePenka)
            .where('userId', '==', userId))
            .snapshotChanges().pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as ListMatches;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    // tslint:disable-next-line:typedef max-line-length
    addMatch(singleMatchId, codePenka, codeTemplate, userId, userName, userEmail, userPhoto, date, homeTeamId, homeTeamName, homeTeamAlias, homeTeamFlag, visitTeamId, visitTeamName, visitTeamAlias, visitTeamFlag, startDate, limitDate, status) {
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
            limitDate,
            status
        }).catch(error => console.log(error));
    }

    addMatchFromSingleMatch(listMatch: ListMatches): any { /* checked */
        this.listMatchesCollection.add(listMatch).catch();
    }

    deleteMatch(id: string): any { /* checked */
        this.listMatchesCollection.doc(id).delete().catch();
    }

    updateStatus(id: string, status: string): any { /* checked */
        this.listMatchesCollection.doc(id).update({status}).catch();
    }
}
