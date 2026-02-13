import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private storageKey = 'users';

  constructor() {
  }

  // Get users from localStorage
  getUsers() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Add user
  addUser(user: any) {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  // Update user
  updateUser(index: number, updatedUser: any) {
    const users = this.getUsers();
    users[index] = updatedUser;
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }



  // Delete user (optional but recommended)
  deleteUser(index: number) {
    const users = this.getUsers();
    users.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }
}