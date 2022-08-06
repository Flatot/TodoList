import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'todo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.apiService.logout().subscribe({
      next: (res) => {
        // CLEAR LOCAL STORAGE
        this.userService.clearUser();
        // NAVIGATE BACK TO SIGNIN
        this.router.navigate(["/signin"]);
      },
      error: (err) => {
        this.snackBar.open("Echec de la déconnexion", "Fermer.", { duration: 3000 });
      }
    })
  }
}
