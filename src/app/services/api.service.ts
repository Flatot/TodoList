import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseUrl = environment.serverUrl;

    constructor(private httpClient: HttpClient) {}

    login(data: any): Observable<any> {
        var url = `${this.baseUrl}/auth/login/`;
        return this.httpClient.post(url, data);
    }

    signup(data: any): Observable<any> {
        var url = `${this.baseUrl}/auth/signup/`;
        return this.httpClient.post(url, data);
    }

    logout(): Observable<any> {
        var url = `${this.baseUrl}/auth/logout/`;
        return this.httpClient.get(url);
    }

    // USERS
    createUser(data: any): Observable<any> {
        var url = `${this.baseUrl}/user/`;
        return this.httpClient.post(url, data);
    }

    // USERS
    updateUserToken(userId: string, token: string): Observable<any> {
        var url = `${this.baseUrl}/user/${userId}`;
        return this.httpClient.patch(url, { token: token });
    }

    listUser(): Observable<any> {
        var url = `${this.baseUrl}/user/`;
        return this.httpClient.get(url);
    }

    // TODO LIST
    createTodoList(data: any): Observable<any> {
        var url = `${this.baseUrl}/todo/`;
        return this.httpClient.post(url, data);
    }

    updateTodoList(todoListId: string, data: any): Observable<any> {
        var url = `${this.baseUrl}/todo/${todoListId}/`;
        return this.httpClient.patch(url, data);
    }

    listUserTodoList(userId: string): Observable<any> {
        var url = `${this.baseUrl}/todo/?userId=${userId}`;
        return this.httpClient.get(url);
    }

    getTodoList(todoListId: string): Observable<any> {
        var url = `${this.baseUrl}/todo/${todoListId}/`;
        return this.httpClient.get(url);
    }

    // TODO LIST ITEMS
    listTodoItems(todoListId: string): Observable<any> {
        var url = `${this.baseUrl}/todo/${todoListId}/items/`;
        return this.httpClient.get(url);
    }

    addTodoItems(todoListId: string, data: any): Observable<any> {
        var url = `${this.baseUrl}/todo/${todoListId}/items/`;
        return this.httpClient.post(url, data);
    }

    updateTodoItems(todoListId: string, itemId: string, data: any): Observable<any> {
        var url = `${this.baseUrl}/todo/${todoListId}/items/${itemId}/`;
        return this.httpClient.patch(url, data);
    }
}
