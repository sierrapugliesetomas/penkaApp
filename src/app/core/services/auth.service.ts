import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../interfaces/user';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {auth} from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router) {

        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
        );
    }

    async googleSignin() {
        const provider = new auth.GoogleAuthProvider();
        const credential: any = await this.afAuth.signInWithPopup(provider).then(
            success => {
                const redirect = localStorage.getItem('redirectTo');
                if (redirect) {
                    localStorage.removeItem('redirectTo');
                    this.router.navigate([redirect]);
                } else {
                    this.router.navigate(['/home']).then();
                }
            }
        );
        return this.updateUserData(credential.user);
    }

    async signOut() {
        await this.afAuth.signOut();
        this.router.navigate(['/']).then();
    }

    private updateUserData({uid, email, photoURL, displayName}: User) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
        const data = {
            uid,
            email,
            photoURL,
            displayName

        };
        return userRef.set(data, {merge: true});

    }
}
