import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'todo-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public fg: FormGroup

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) {
    this.fg = this.fb.group({
      "email": [null, [Validators.required, Validators.email]],
      "password": [null, Validators.required]
    });
  }

  ngOnInit(): void {

  }

  login() {
    this.apiService.login(this.fg.getRawValue()).subscribe({
      next: (res) => {
        var userData = {
          "id": res.uid,
          "email": res.email,
          "token": res.stsTokenManager?.accessToken,
        }
        this.userService.user = userData;
        this.router.navigate(["/home"]);
      },
      error: (err) => {
        switch (err) {
          case "auth/user-not-found":
            this.snackBar.open("Utilisateur non reconnu.", "Fermer.", { duration: 3000 });
            break;
          case "auth/wrong-password":
            this.snackBar.open("Mauvais mot de passe.", "Fermer.", { duration: 3000 });
            break;
          default:
            this.snackBar.open("Echec de la connexion", "Fermer.", { duration: 3000 });
            break;
        }
      }
    })
  }

  redirectSignup() {
    this.router.navigate(["/signup"]);
  }
}
