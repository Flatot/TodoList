import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faMars, faTrash, faVenus, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'todo-manage-list',
  templateUrl: './manage-list.component.html',
  styleUrls: ['./manage-list.component.scss']
})
export class ManageListComponent implements OnInit {

  public faVenus = faVenus;
  public faMars = faMars;
  public faTrash = faTrash;

  public todoListGroup: FormGroup;

  // LIST OF USERS IN THE APP
  public usersList = [];
  public filteredUsersList: Array<any> = [];

  // FORM CONTROL
  public userControl: FormControl = new FormControl();

  // LIST OF USERS IN THE TODO LIST
  public todosUsers: Array<any> = [];

  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ManageListComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.todoListGroup = this.fb.group({
      name: ["", Validators.required]
    });
    this.apiService.listUser().subscribe({
      next: (res) => {
        this.usersList = res;
        this.todosUsers = this.data?.users.map((user: any) => this.getUserDetails(user));
        // FILTER TO REMOVE USERS ALREADY IN TODO LIST
        this.filteredUsersList = res.filter((user: any) => !this.data?.users.includes(user?.id));
      },
      error: (err) => {
        this.snackBar.open("Erreur lors de la récupération des utilisateurs.", "Fermer.", { duration: 3000 });
      }
    });
    this.userControl.valueChanges.subscribe({
      next: (res) => {
        this.filteredUsersList = this.usersList.filter((user: any) => user.first_name.includes(res) || user.last_name.includes(res));
      }
    })
  }

  displayFn(user: any): string {
    return (user?.first_name && user?.last_name) ? user?.first_name + " " + user?.last_name : '';
  }

  ngOnInit(): void {
    this.todoListGroup.patchValue(this.data);
  }

  addUserInList(user: any) {
    this.todosUsers.push(user);
  }

  removeUserInList(idx: number) {
    // REMOVE ELEMENT AT IDX
    this.todosUsers.splice(idx, 1);
  }

  saveItem() {
    this.dialogRef.close({ ...this.todoListGroup.getRawValue(), users: this.todosUsers.map(user => user?.id) });
  }

  getUserDetails(userId: string) {
    var res = this.usersList.find((user: any) => user?.id == userId);
    return res;
  }
}
