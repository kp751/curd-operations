import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user';

@Component({
  selector: 'app-usertable',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './usertable.html',
  styleUrl: './usertable.css',
})
export class Usertable implements OnInit {

  users: any[] = [];
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  // ✅ Filter Users Based on Search
  get filteredUsers() {
    if (!this.searchText.trim()) {
      return this.users;
    }

    const search = this.searchText.toLowerCase();

    return this.users.filter(user =>
      Object.values(user).some(value =>
        value?.toString().toLowerCase().includes(search)
      )
    );
  }

  // ✅ Pagination Applied on Filtered Users
  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // ✅ Total Pages Based on Filtered Users
  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  // ✅ Search Button Click
  searchUsers() {
    this.currentPage = 1; // Reset page after search
  }

  // ✅ Next Page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // ✅ Previous Page
   previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  // ✅ Delete User  ← ADD HERE
  deleteUser(index: number) {

    const actualIndex =
      (this.currentPage - 1) * this.itemsPerPage + index;

    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(actualIndex);
      this.users = this.userService.getUsers();
    }
  }

}
