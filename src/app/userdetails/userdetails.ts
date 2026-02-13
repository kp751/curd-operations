import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../services/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userdetails',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './userdetails.html',
  styleUrl: './userdetails.css',
})
export class Userdetails implements OnInit {

  users: any = {
    name: '',
    email: '',
    mobileNo: '',
    role: '',
    status: ''
  };

  isViewMode = false;
  isEditMode = false;
  userIndex: number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.userIndex = +id;

      const users = this.userService.getUsers();
      this.users = { ...users[this.userIndex] };
    }

    if (this.router.url.includes('view')) {
      this.isViewMode = true;
    }

    if (this.router.url.includes('edit')) {
      this.isEditMode = true;
    }
  }

  save() {
    if (this.isEditMode) {
      this.userService.updateUser(this.userIndex, this.users);
    } else {
      this.userService.addUser(this.users);
    }

    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['/']);
  }

  isFormValid() {
    return (
      this.users.name &&
      this.users.email &&
      this.users.mobileNo &&
      this.users.role &&
      this.users.status
    );
  }
}