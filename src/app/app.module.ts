import { forwardRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HeaderComponent } from './components/header/header.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ManageItemComponent } from './components/modals/manage-item/manage-item.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';
import { TodoItemsComponent } from './components/todo-items/todo-items.component';
import { TodoListItemsComponent } from './views/todo-list-items/todo-list-items.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ManageListComponent } from './components/modals/manage-list/manage-list.component';
// DIRECTIVES
import { LongPressDirective } from './components/directives/long-click.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    HeaderComponent,
    TodoListComponent,
    TodoItemsComponent,
    ManageItemComponent,
    ManageListComponent,
    SignInComponent,
    TodoListItemsComponent,
    SignUpComponent,
    LongPressDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ManageItemComponent),
    },
    ApiService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
