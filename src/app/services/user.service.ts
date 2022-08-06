import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public get user() {
    var userJson = null;
    if (localStorage.getItem("user")) {
      var userStored: any = localStorage.getItem("user");
      userJson = JSON.parse(userStored);
    }
    return userJson;
  }

  public set user(userData: any) {
    localStorage.setItem("user", JSON.stringify({ ...this.user, ...userData }));
  }

  public clearUser() {
    localStorage.removeItem("user");
  }

  constructor() { }

}
