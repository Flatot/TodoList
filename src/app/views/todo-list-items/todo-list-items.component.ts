import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'todo-list-items',
  templateUrl: './todo-list-items.component.html',
  styleUrls: ['./todo-list-items.component.scss']
})
export class TodoListItemsComponent implements OnInit {

  public list: any;
  private listId: string | null = null;

  constructor(
    private activedRoute: ActivatedRoute,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) {
    this.activedRoute.paramMap.forEach(param => {
      if (param.get('id')) {
        this.listId = param.get('id');
        this.apiService.getTodoList(this.listId!!).subscribe({
          next: (res) => {
            this.list = res;
          },
          error: (err) => {
            this.snackBar.open("Erreur lors de la récupération des détails de la todo list.", "Fermer.", { duration: 3000 });
          }
        })
      }
    });
  }

  ngOnInit(): void {
  }

}
