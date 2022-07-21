import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public todoItems = [
    {
      term: "short",
      value: "Faire les courses"
    },
    {
      term: "short",
      value: "Faire le ménage"
    },
    {
      term: "medium",
      value: "Création du site vitrine"
    },
    {
      term: "medium",
      value: "Mise en place des profils freelances"
    },
    {
      term: "long",
      value: "Vacances au japon"
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
