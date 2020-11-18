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
        this.templatesCollection = afs.collection<Template>('templates', ref => ref.orderBy('date', 'asc'));
        this.templates = this.templatesCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Template;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    getTemplates() {
        return this.templates;
    }

    getTemplatesById(id) {
        return this.afs.collection('templates').doc(id).valueChanges();
    }


}
