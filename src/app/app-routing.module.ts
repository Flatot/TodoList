import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    // COMPONENTS
    import { HomeComponent } from './home/home.component';
    import { SettingsComponent } from './settings/settings.component';

    const routes: Routes = [
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent, pathMatch: 'full' },
        { path: 'settings', component: SettingsComponent, pathMatch: 'full' },
    ];

    @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    })
    export class AppRoutingModule { }
    
