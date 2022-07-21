import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faHandSparkles, faLaptopCode, faPlaneDeparture, faUserPen } from '@fortawesome/free-solid-svg-icons';
// ICONS
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public faCheck = faCheckCircle;

  public todoItems = [
    {
      term: "short",
      value: "Faire les courses",
      icon: faCartShopping
    },
    {
      term: "short",
      value: "Faire le ménage",
      icon: faHandSparkles
    },
    {
      term: "medium",
      value: "Création du site vitrine",
      icon: faLaptopCode
    },
    {
      term: "medium",
      value: "Mise en place des profils freelances",
      icon: faUserPen
    },
    {
      term: "long",
      value: "Vacances au japon",
      icon: faPlaneDeparture
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
