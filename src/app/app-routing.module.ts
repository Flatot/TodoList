import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// COMPONENTS
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { TodoListItemsComponent } from './views/todo-list-items/todo-list-items.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'signin', component: SignInComponent, pathMatch: 'full' },
    { path: 'signup', component: SignUpComponent, pathMatch: 'full' },
    { path: 'todo/:id', component: TodoListItemsComponent, pathMatch: 'full' },
    { path: 'settings', component: SettingsComponent, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

