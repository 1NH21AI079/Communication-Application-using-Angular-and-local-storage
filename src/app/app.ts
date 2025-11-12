import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Welcome } from "./welcome/welcome";
import { DocsManagement } from "./docs-management/docs-management";
import { GroupChat } from "./group-chat/group-chat";
import { Login } from "./login/login";
import { LoginSuccessful } from './login-successful/login-successful';
import { Logout } from "./logout/logout";
import { Register } from "./register/register";
import { RegisterSuccessful } from "./register-successful/register-successful";
import { UsersManagement } from './users-management/users-management';
import { UsersList } from './users-list/users-list';    

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UsersList,
    Welcome,
    Login,
    Register,
    GroupChat,
    DocsManagement,
    Logout,
    LoginSuccessful,
    RegisterSuccessful,
    UsersManagement
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('app');
}
