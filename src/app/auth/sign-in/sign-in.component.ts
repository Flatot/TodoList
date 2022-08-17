import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

import * as firebaseConfig from '../../../assets/todo-list-config.json';

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

@Component({
    selector: 'todo-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
    public fg: FormGroup;

    // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    public messaging = getMessaging();

    constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private userService: UserService) {
        this.fg = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required],
        });
    }

    ngOnInit(): void {}

    login() {
        this.apiService.login(this.fg.getRawValue()).subscribe({
            next: (res) => {
                var userData = {
                    id: res.uid,
                    email: res.email,
                    token: res.stsTokenManager?.accessToken,
                };
                this.userService.user = userData;
                getToken(messaging, { vapidKey: 'BAhKGVFOxr0LdrLViCeFwpgbxjhWMl6Q39WCUOLP6iQJRWx-D7icCQB2Ly_ozJuNkK4RbnE_pLtR344hkFJou6Y' })
                    .then((currentToken) => {
                        if (currentToken) {
                            this.apiService.updateUserToken(res.uid, currentToken).subscribe({
                                next: (res) => {},
                                error: (err) => {},
                            });
                        } else {
                            // Show permission request UI
                            console.log('No registration token available. Request permission to generate one.');
                        }
                    })
                    .catch((err: any) => {
                        console.log('An error occurred while retrieving token. ', err);
                    });
                this.router.navigate(['/home']);
            },
            error: (err) => {
                switch (err) {
                    case 'auth/user-not-found':
                        this.snackBar.open('Utilisateur non reconnu.', 'Fermer.', { duration: 3000 });
                        break;
                    case 'auth/wrong-password':
                        this.snackBar.open('Mauvais mot de passe.', 'Fermer.', { duration: 3000 });
                        break;
                    default:
                        this.snackBar.open('Echec de la connexion', 'Fermer.', { duration: 3000 });
                        break;
                }
            },
        });
    }
}
