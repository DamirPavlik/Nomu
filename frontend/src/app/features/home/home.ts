import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/aut.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.html',
})
export class Home {
    private auth = inject(AuthService);
    private router = inject(Router);

    role = this.auth.role;

    logout() {
        this.auth.logout();
        this.router.navigate(['/login']);
    }
}
