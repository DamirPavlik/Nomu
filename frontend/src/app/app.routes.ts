import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Home } from './features/home/home';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'home', component: Home, canActivate: [authGuard]},
    {path: '', pathMatch: 'full', redirectTo: 'login'},
];
