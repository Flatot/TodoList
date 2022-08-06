import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faAdd, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { ManageListComponent } from '../modals/manage-list/manage-list.component';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public faAngleRight = faAngleRight;
  public faAdd = faAdd;

  public todoList: Array<any> = [];

  // SHOW LOADER
  public loading = false;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    // SHOW LOADER
    this.loading = true;
    this.apiService.listUserTodoList(this.userService.user?.id).subscribe({
      next: (res) => {
        this.todoList = res;
        // HIDE LOADER
        this.loading = false;
      },
      error: (err) => {
        // HIDE LOADER
        this.loading = false;
        this.snackBar.open("Erreur lors de la récupération des todo listes.", "Fermer.", { duration: 3000 });
      }
    })
  }

  viewList(idx: number) {
    this.router.navigate(["/todo/" + this.todoList[idx].id]);
  }

  manageToDoList(data: any = null, idx = 0) {
    let itemModal = this.dialog.open(ManageListComponent,
      {
        data: data,
        width: '600px',
      }
    );
    itemModal.afterClosed().subscribe({
      next: (res: any) => {
        if (res) {
          if (!data) {
            this.apiService.createTodoList({ list: { ...res, users: [this.userService.user?.id] } }).subscribe({
              next: (res) => {
                this.todoList.push(res);
              },
              error: (err) => {
                this.snackBar.open("Erreur lors de la création de la liste.", "Fermer.", { duration: 3000 });
              }
            });
          }
          else {
            this.apiService.updateTodoList(this.todoList[idx].id, { list: res }).subscribe({
              next: (res) => {
                this.todoList[idx] = res;
              },
              error: (err) => {
                this.snackBar.open("Erreur lors de la mise à jour de la liste.", "Fermer.", { duration: 3000 });
              }
            });
          }
        }
      },
      error: (err) => {

      }
    })
  }
}
