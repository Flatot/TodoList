import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'todo-manage-item',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.scss']
})
export class ManageItemComponent implements OnInit {

  public todoItemGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ManageItemComponent>,
    private fb: FormBuilder,
  ) {
    this.todoItemGroup = this.fb.group({
      name: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.todoItemGroup.patchValue(this.data);
  }

  saveItem() {
    this.dialogRef.close(this.todoItemGroup.getRawValue());
  }
}
