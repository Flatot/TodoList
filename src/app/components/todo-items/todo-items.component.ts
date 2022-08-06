import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { faCheckCircle, faAdd, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { ManageItemComponent } from '../modals/manage-item/manage-item.component';
@Component({
  selector: 'todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {

  public faCheck = faCheckCircle;
  public faEdit = faEdit;
  public faAdd = faAdd;

  // ID OF TODO LIST
  private todoId: any;

  public todoItems: Array<any> = [];

  // SHOW LOADER
  public loading = false;

  constructor(
    private activedRoute: ActivatedRoute,
    private apiService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.forEach(param => {
      if (param.get('id')) {
        // SHOW LOADER
        this.loading = true;
        this.todoId = param.get('id');
        this.apiService.listTodoItems(this.todoId).subscribe({
          next: (res) => {
            this.todoItems = res;
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
    });
  }

  manageToDoItem(data: any = null, idx = 0) {
    let itemModal = this.dialog.open(ManageItemComponent,
      {
        data: data,
        width: '600px',
      }
    );
    itemModal.afterClosed().subscribe({
      next: (res: any) => {
        if (res) {
          if (!data) {
            this.apiService.addTodoItems(this.todoId, { item: res }).subscribe({
              next: (res) => {
                this.todoItems.push(res);
              },
              error: (err) => {
                this.snackBar.open("Erreur lors de la création de la tâche.", "Fermer.", { duration: 3000 });
              }
            });
          }
          else {
            this.apiService.updateTodoItems(this.todoId, this.todoItems[idx].id, { item: res }).subscribe({
              next: (res) => {
                this.todoItems[idx] = res;
              },
              error: (err) => {
                this.snackBar.open("Erreur lors de la mise à jour de la tâche.", "Fermer.", { duration: 3000 });
              }
            });
          }
        }
      },
      error: (err) => {

      }
    })
  }

  checkedItem(idx = 0) {
    this.apiService.updateTodoItems(this.todoId, this.todoItems[idx].id, { item: { checked: !this.todoItems[idx].checked } }).subscribe({
      next: (res) => {
        this.todoItems[idx] = res;
      },
      error: (err) => {
        this.snackBar.open("Erreur lors de la mise à jour de la tâche.", "Fermer.", { duration: 3000 });
      }
    });
  }
}
