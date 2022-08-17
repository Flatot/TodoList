import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'todo-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(private router: Router, private userService: UserService, private apiService: ApiService) {}

    ngOnInit(): void {
        if (!this.userService.user) {
            // USER NOT LOGGED IN
            this.router.navigate(['/signin']);
            return;
        }
    }
}
