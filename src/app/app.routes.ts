import { Routes } from '@angular/router';
import { Welcome } from './welcome/welcome';
import { UsersList } from './users-list/users-list';
import { UsersManagement } from './users-management/users-management';
import { RegisterSuccessful } from './register-successful/register-successful';
import { Logout } from './logout/logout';
import { LoginSuccessful } from './login-successful/login-successful';
import { Login } from './login/login';
import { GroupChat } from './group-chat/group-chat';
import { DocsManagement } from './docs-management/docs-management';
import { Register } from './register/register';

export const routes: Routes = [
  { path: 'welcome', component: Welcome },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'users-list', component: UsersList },
  { path: 'register-succesful', component: RegisterSuccessful },
  { path: 'register', component: Register },
  { path: 'login', component: Login },  
  {
    path: 'login-successful',
    component: LoginSuccessful,
    children: [
      { path: 'group-chat', component: GroupChat },
      {
        path: 'users-management',
        component: UsersManagement,
        children: [
          { path: 'users-list', component: UsersList },
          { path: '', redirectTo: 'users-list', pathMatch: 'full' },
        ],
      },
      { path: 'docs-management', component: DocsManagement },
      { path: 'logout', component: Logout },
    ],
  },
  { path: 'group-chat', redirectTo: 'login-successful/group-chat' },
  { path: 'users-management', redirectTo: 'login-successful/users-management' },
  { path: 'docs-management', redirectTo: 'login-successful/docs-management' },
  { path: 'logout', redirectTo: 'login-successful/logout' },
];