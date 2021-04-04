import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Template} from '../interfaces/template';

@Injectable({
    providedIn: 'root'
})
export class TemplatesService {

    templatesCollection: AngularFirestoreCollection<Template>;
    templates: Observable<Template[]>;

    constructor(private afs: AngularFirestore) {
        this.templatesCollection = afs.collection<Template>('templates');
        this.templates = this.templatesCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Template;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    getTemplatesPublicLimit(): any {
        return this.afs.collection<Template>('templates', ref => ref
            .where('publish', '==', true)
            .where('status', '==', '1')
            .limit(10))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Template;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getTemplatesPublic(): any { /* checked */
        return this.afs.collection<Template>('templates', ref => ref
            .where('publish', '==', true)
            .where('status', '==', '1'))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Template;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );
    }

    getTemplatesById(id): any {
        return this.afs.collection('templates').doc(id).valueChanges();
    }

    inactivated(id): any {
        this.templatesCollection.doc(id).update({status: '2'}).catch();
    }

}
