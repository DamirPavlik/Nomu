import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/aut.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './login.html',
    styleUrl: './login.scss',
})
export class Login {
    private fb = inject(FormBuilder);
	private auth = inject(AuthService);
	private router = inject(Router);

	errorMessage = '';

	form = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(8)]],
	});

	submit() {
		if (this.form.invalid) return;
		const {email, password} = this.form.getRawValue();

		this.auth.login(email!, password!).subscribe({
			next: () => {
				this.auth.fetchMe().subscribe(() => this.router.navigate(["/home"]));
			},
			error: () => {
				this.errorMessage = "Invalid email or password";
			},
		});
	}
}