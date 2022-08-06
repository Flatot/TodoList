import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'todo-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public fg: FormGroup

  constructor(private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) {
    this.fg = this.fb.group({
      "email": [null, [Validators.required, Validators.email]],
      "password": [null, Validators.required],
      "confirm_password": [null, Validators.required],
      "first_name": [null, Validators.required],
      "last_name": [null, Validators.required],
      "gender": [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  createAccount() {
    if (this.fg.invalid) {
      this.fg.markAllAsTouched();
      return;
    }
    if (this.fg.get('password')?.value != this.fg.get('confirm_password')?.value) {
      this.fg.get('password')?.setErrors({ notSame: true });
      this.fg.get('confirm_password')?.setErrors({ notSame: true });
      return;
    }
    this.apiService.signup({ email: this.fg.get('email')?.value, password: this.fg.get('password')?.value }).subscribe({
      next: (res) => {
        var userData = {
          "id": res.uid,
          "email": res.email,
          "token": res.stsTokenManager?.accessToken,
        }
        this.userService.user = userData;
        this.apiService.createUser({ id: res.uid, ...this.fg.getRawValue() }).subscribe({
          next: (res) => {
            this.router.navigate(["/home"]);
          },
          error: (err) => {
            this.snackBar.open("Erreur lors de la création de l'utilisateur.", "Fermer.", { duration: 3000 });
          }
        });
      },
      error: (err) => {
        this.snackBar.open("Erreur lors de la création du compte", "Fermer.", { duration: 3000 });
      }
    })
  }
}
