import { Routes } from '@angular/router';
import { Usertable } from './usertable/usertable';
import { Userdetails } from './userdetails/userdetails';

export const routes: Routes = [
  {
    path: '',
    component: Usertable
  },
  {
    path: 'userdetails',
    component: Userdetails
  },
  {
    path: 'userdetails/:id',
    component: Userdetails
  },
  {
      path: 'add', 
      component: Userdetails 
  },
  {
    path: 'view/:id',
    component: Userdetails,
    data: { mode: 'view' }   //  ADD THIS
  },
  {
  path: 'edit/:id',
  component: Userdetails,
  data: { mode: 'edit' }
}
];
